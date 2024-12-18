import React, { useState, useEffect } from "react";
import { useParams,useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "./Message.css";

const socket = io("http://localhost:3000"); // Replace with your backend URL

const Message = () => {
  //const { chatId } = useParams(); // Get chatId from URL params
  const { chatId: urlChatId } = useParams(); // Get chatId from URL
  const location = useLocation();
  const { chatImage } = location.state || {};
  const [chatId, setChatId] = useState(null); // Local chatId state

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Load the logged-in user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);

    // Step 2: Set chatId from URL or fallback to localStorage
    if (urlChatId) {
      setChatId(urlChatId);
    } else {
      const storedChatId = localStorage.getItem("currentChatId");
      if (storedChatId) setChatId(storedChatId);
    }
  }, [urlChatId]);

  // Join the chat room and fetch messages
  useEffect(() => {
    if (!chatId || !currentUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/chat/${chatId}/messages`
        );
        setMessages(res.data); // Set the fetched messages
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    // Join the chat room for real-time communication
    socket.emit("joinRoom", chatId);

    // Fetch existing messages
    fetchMessages();

    // Listen for new messages from the server
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  // Listen for chatDeleted event
  socket.on("chatDeleted", ({ chatId: deletedChatId }) => {
    if (deletedChatId === chatId) {
      alert("This chat has been deleted.");
      window.location.href = "/messages"; // Redirect to messages page
    }
  });
    return () => {
      socket.off("receiveMessage");
      socket.off("chatDeleted");
    };
  }, [chatId, currentUser]);

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // Prepare the message data
      const messageData = {
        chatId,
        sender: currentUser._id,
        text: newMessage,
      };

      // Save the message to the database
      const res = await axios.post("http://localhost:3000/api/chat/send", messageData);

      // Extract the new message
      const new_mess = res.data.messages.slice(-1)[0];
      new_mess.sender = { _id: new_mess.sender }; // Format sender

      // Emit the message to the server for real-time updates
      socket.emit("sendMessage", { chatId, newMessage: new_mess });

      // Update local messages
      //setMessages((prevMessages) => [...prevMessages, new_mess]);
      setNewMessage(""); // Clear input
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="message-container">
      <div className="message-wrapper">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-item ${
                msg.sender?._id === currentUser?._id ? "owner" : ""
              }`}
            >
              <img
                src={
                  msg.sender?._id === currentUser?._id
                    ? currentUser?.img
                    :  chatImage
                }
                alt={msg.sender?._id === currentUser?._id ? "Owner" : "User"}
              />
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <hr />
        <div className="compose-message">
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
