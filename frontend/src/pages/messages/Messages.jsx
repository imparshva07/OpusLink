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

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this chat? This action cannot be undone."
  );

  if (!confirmDelete) return; 

    try {

      await axios.delete(`http://localhost:3000/api/chat/delete/${chatId}`);
  

      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

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
        setChats(res.data); 
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();

    socket.on("newMessage", ({ chatId, lastMessage, timestamp }) => {
      setChats((prevChats) => {
        const chatExists = prevChats.some((chat) => chat._id === chatId);
    
        if (!chatExists) {
         
          window.location.reload();
          return prevChats; 
        }
    

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