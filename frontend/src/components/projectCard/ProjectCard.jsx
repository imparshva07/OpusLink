import React from "react";
import "./ProjectCard.css";
import { Link } from "react-router-dom";

const ProjectCard = ({ item }) => {
  return (
    <Link to={`/project/${item.id}`} className="project-link">
      <div className="projectCard">
        <img src={item.img} alt="Project Thumbnail" className="thumbnail" />
        <div className="content">
          <div className="creator">
            <img src={item.pp} alt="Creator Profile" className="profile-pic" />
            <span className="username">{item.username}</span>
          </div>
          <p className="description">{item.desc}</p>
          <div className="ratings">
            <img src="./img/star.svg" alt="Star Icon" className="star-icon" />
            <span className="rating-score">{item.star}</span>
          </div>
        </div>
        <hr className="divider" />
        <div className="footer">
          <img src="./img/bookmark.svg" alt="Bookmark Icon" className="bookmark-icon" />
          <div className="price-info">
            <span className="starting-text">Starting at</span>
            <h2 className="price">
              $ {item.price}
              <sup>.99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;