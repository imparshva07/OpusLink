import React from "react";
import { Link } from "react-router-dom";
import "./Message.css";

const Message = () => {
  return (
    <div className="message-container">
      <div className="message-wrapper">
        <span className="breadcrumb-links">
          <Link to="/messages">Messages</Link> &gt; John Doe
        </span>
        <div className="chat-messages">
          <div className="message-item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="User"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              facilisis arcu vel risus sagittis, et interdum sapien ultricies.
            </p>
          </div>
          <div className="message-item owner">
            <img
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Owner"
            />
            <p>
              Nunc aliquet lorem sit amet neque tempor, sed faucibus ligula
              euismod. Integer nec nulla a ipsum rhoncus auctor.
            </p>
          </div>
          <div className="message-item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="User"
            />
            <p>
              Pellentesque malesuada felis id velit fermentum, et laoreet odio
              tincidunt. Sed fringilla libero leo, ut faucibus dolor dapibus
              id.
            </p>
          </div>
          <div className="message-item owner">
            <img
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Owner"
            />
            <p>
              Aliquam ultricies dui at dui vehicula, in laoreet ante tempor.
              Fusce in arcu vitae purus tincidunt posuere.
            </p>
          </div>
          {/* More messages */}
        </div>
        <hr />
        <div className="compose-message">
          <textarea placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
