import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.css";

function CatCard({ card }) {
  return (
    <Link to="/projects?cat=design">
      <div className="catCard">
        <img src={card.img} alt={card.title} />
        <div className="info">
          <span className="desc">{card.desc}</span>
          <span className="title">{card.title}</span>
        </div>
      </div>
    </Link>
  );
}

export default CatCard;