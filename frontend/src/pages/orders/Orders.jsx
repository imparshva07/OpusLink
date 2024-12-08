import React from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  return (
    <div className="orders">
      <div className="orders-container">
        <div className="orders-header">
          <h1>Order List</h1>
        </div>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {[
              { title: "Stunning Concept Art", price: "59.99", name: "Maria Anders" },
              { title: "AI Generated Concept Art", price: "79.99", name: "Francisco Chang" },
              { title: "Digital Character", price: "110.99", name: "Roland Mendel" },
              { title: "Hyper Realistic Painting", price: "39.99", name: "Helen Bennett" },
              { title: "AI Generated Digital Art", price: "119.99", name: "Yoshi Tannamuri" },
              { title: "Text-Based AI Art", price: "49.99", name: "Giovanni Rovelli" },
            ].map((order, index) => (
              <tr key={index}>
                <td>
                  <img
                    className="order-image"
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt={order.title}
                  />
                </td>
                <td>{order.title}</td>
                <td>${order.price}</td>
                <td>{order.name}</td>
                <td>
                  <img className="message-icon" src="./img/message.png" alt="Message" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
