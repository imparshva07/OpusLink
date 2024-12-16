/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.css";

function CatCard({ card }) {
  const userId = card.id ? card.id : card._id;
  return (
    <Link to={`/project/${userId}`} className="project-title-link">
      <div className="catCard">
        <img src={card.img} alt={card.title} />
        <div className="info">
          <span className="desc">{card.description}</span>
          <span className="title">{card.title}</span>
        </div>
      </div>
    </Link>
  );
}

export default CatCard;
