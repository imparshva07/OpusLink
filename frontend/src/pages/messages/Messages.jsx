import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Messages.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
const Messages = () => {
  const [chats, setChats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatImage, setImage] = useState({});
  const handleDeleteChat = async (chatId) => {
      // Ask for confirmation
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this chat? This action cannot be undone."
  );

  if (!confirmDelete) return; // If user cancels, do nothing

    try {
      // Call backend API to delete the chat
      await axios.delete(`http://localhost:3000/api/chat/delete/${chatId}`);
  
      // Update local state to remove the chat
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };
  // Load currentUser from localStorage or fetch it
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser) return;

      try {
        // Replace with your actual endpoint for fetching all chats
        console.log(currentUser);
        const res = await axios.get(`http://localhost:3000/api/chat/${currentUser._id}`);
        const images = res.data.reduce((acc, chat) => {
          const img = currentUser?.isClient
            ? chat.freelancerId?.img
            : chat.clientId?.img;
          acc[chat._id] = img;
          return acc;
        }, {});
        setImage(images);
        setChats(res.data); // Assuming this returns a list of chat objects
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();
    // Listen for new messages
    socket.on("newMessage", ({ chatId, lastMessage, timestamp }) => {
      setChats((prevChats) => {
        const chatExists = prevChats.some((chat) => chat._id === chatId);
    
        if (!chatExists) {
          // Reload the page if chat does not exist
          window.location.reload();
          return prevChats; // Return the previous state to avoid errors
        }
    
        // If chat exists, update it
        return prevChats.map((chat) =>
          chat._id === chatId
            ? {
                ...chat,
                messages: [...chat.messages.slice(0, -1), { text: lastMessage, timestamp }],
              }
            : chat
        );
      });
    });
 // Listen for chatDeleted event
 socket.on("chatDeleted", ({ chatId }) => {
  console.log(`Chat deleted: ${chatId}`);
  setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
});
    return () => {
      socket.off("newMessage");
      socket.off("chatDeleted");
    };
  }, [currentUser]);

  return (
    <div className="messages">
      <div className="messages-container">
        <div className="messages-header">
          <h1>Messages</h1>
        </div>
        <table className="messages-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat) => (
              <tr key={chat._id}>
                <td>
                  {currentUser?.isClient
                    ? chat.freelancerId.name
                    : chat.clientId.name}
                </td>
                <td>
                  <Link
                    to={`/message/${chat._id}`}
                    className="message-link"
                    state={{ chatImage: chatImage[chat._id] }}
                  >
                    {chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].text.substring(
                          0,
                          100
                        )
                      : "No messages yet..."}
                  </Link>
                </td>
                <td>
                  {chat.messages.length > 0
                    ? new Date(
                        chat.messages[chat.messages.length - 1].timestamp
                      ).toLocaleString()
                    : "-"}
                </td>
                <td>
                <Link to={`/message/${chat._id}`} state={{ chatImage: chatImage[chat._id] }} >
                  <button >Message</button>
                </Link>
                <button className="delete-button" onClick={() => handleDeleteChat(chat._id)}>
                  Delete Chat
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;