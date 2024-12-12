import React from "react";
import { Link } from "react-router-dom";
import "./Messages.css";

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;

  return (
    <div className="messages">
      <div className="messages-container">
        <div className="messages-header">
          <h1>Messages</h1>
        </div>
        <table className="messages-table">
          <thead>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Charley Sharp", messageTime: "1 hour ago", message: message },
              { name: "John Doe", messageTime: "2 hours ago", message: message },
              { name: "Elinor Good", messageTime: "1 day ago", message: message },
              { name: "Garner David", messageTime: "2 days ago", message: message },
              { name: "Troy Oliver", messageTime: "1 week ago", message: message },
            ].map((messageItem, index) => (
              <tr key={index} className={index < 2 ? "active" : ""}>
                <td>{messageItem.name}</td>
                <td>
                  <Link to="/message/123" className="message-link">
                    {messageItem.message.substring(0, 100)}...
                  </Link>
                </td>
                <td>{messageItem.messageTime}</td>
                {index < 2 && (
                  <td>
                    <button>Mark as Read</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
