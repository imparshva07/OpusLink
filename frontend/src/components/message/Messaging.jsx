import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000");

function Messaging({ currentUser, freelancerId }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [chatId, setChatId] = useState(null);

  // Step 1: Initialize Chat
  useEffect(() => {
    const initiateChat = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/chat/initiate",
          {
            clientId: currentUser._id,
            freelancerId,
          }
        );
        setChatId(data._id);
        socket.emit("joinRoom", { chatId: data._id });
        fetchMessages(data._id);
      } catch (error) {
        console.error("Error initiating chat:", error.message);
      }
    };

    initiateChat();
  }, [currentUser._id, freelancerId]);

  // Step 2: Fetch Messages
  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/chat/${chatId}/messages`
      );
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  // Step 3: Send Message
  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const messageData = {
      chatId,
      sender: currentUser._id,
      text: messageText,
    };

    try {
      await axios.post("http://localhost:3000/api/chat/send", messageData);
      socket.emit("message", {
        chatId,
        message: { ...messageData, senderName: currentUser.name },
      });

      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  // Step 4: Listen for Incoming Messages
  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div>
      <h3>Chat</h3>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderName || "User"}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message"
        style={{ width: "80%" }}
      />
      <button
        onClick={handleSendMessage}
        style={{ width: "18%", marginLeft: "2%" }}
      >
        Send
      </button>
    </div>
  );
}

export default Messaging;
