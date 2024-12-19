import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "./Message.css";

const socket = io("http://localhost:3000");

const Message = () => {
  const { chatId: urlChatId } = useParams();
  const location = useLocation();
  const { chatImage } = location.state || {};
  const [chatId, setChatId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);

    if (urlChatId) {
      setChatId(urlChatId);
    } else {
      const storedChatId = localStorage.getItem("currentChatId");
      if (storedChatId) setChatId(storedChatId);
    }
  }, [urlChatId]);

  useEffect(() => {
    if (!chatId || !currentUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/chat/${chatId}/messages`
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    socket.emit("joinRoom", chatId);

    fetchMessages();

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("chatDeleted", ({ chatId: deletedChatId }) => {
      if (deletedChatId === chatId) {
        alert("This chat has been deleted.");
        window.location.href = "/messages";
      }
    });
    return () => {
      socket.off("receiveMessage");
      socket.off("chatDeleted");
    };
  }, [chatId, currentUser]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        chatId,
        sender: currentUser._id,
        text: newMessage,
      };

      const res = await axios.post(
        "http://localhost:3000/api/chat/send",
        messageData
      );

      const new_mess = res.data.messages.slice(-1)[0];
      new_mess.sender = { _id: new_mess.sender };

      socket.emit("sendMessage", { chatId, newMessage: new_mess });

      setNewMessage("");
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
                    : chatImage
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
