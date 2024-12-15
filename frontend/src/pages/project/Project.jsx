/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Project.css";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/${id}`);
        setProject(response.data);
        if (response.data.userId) {
          fetchUserName(response.data.userId);
        }
        if (response.data.category) {
          fetchRandomImage(response.data.category);
        }
        fetchBids(response.data._id); // Fetch bids for the project
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };

    const fetchUserName = async (userId) => {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/getUser", { _id: userId });
        if (response.data && response.data.name) {
          setUserName(response.data.name);
        } else {
          setUserName("Unknown User");
        }
        if (response.data && response.data.img) {
          setUserImage(response.data.img);
        } else {
          setUserImage("https://img.freepik.com/free-photo/teenager-boy-portrait_23-2148105678.jpg");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
        setUserName("Unknown User");
      }
    };

    const fetchRandomImage = async (category) => {
      try {
        const response = await axios.get("https://api.unsplash.com/photos/random", {
          params: { query: category, client_id: 'uJ5AA6wgZQ2QQWQAkUfhEac2_iZZRIBNBovaV4Ur3uI' },
        });
        if (response.data && response.data.urls && response.data.urls.regular) {
          setCategoryImage(response.data.urls.regular);
        } else {
          setCategoryImage("https://via.placeholder.com/300x200");
        }
      } catch (error) {
        console.error("Error fetching random image:", error);
        setCategoryImage("https://via.placeholder.com/300x200");
      }
    };

    const fetchBids = async (projectId) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/bids/project/${id}`);
        
        setBids(response.data);
      } catch (error) {
        console.error("Error fetching bids:", error);
        setBids([]);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading Project...</div>;
  }

  if (!project) {
    return <div className="error">Project not found</div>;
  }

  return (
    <div className="project">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            OpusLink &gt; {project.category} &gt;
          </span>

          <h1>{project.title}</h1>
          <div className="user">
            <img className="pp" src={userImage} alt="Project Image" />
            <span>Project by {userName}</span>
          </div>
          <img
            src={categoryImage}
            alt="Project Image"
            className="project-image"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <h2>About This Project</h2>
          <p>{project.description}</p>
          <div className="bids-section">
            <h2>Bids for this Project</h2>
            <table className="bids-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Bid Amount</th>
                  <th>Freelancer</th>
                  <th>Proposal</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        className="bid-image"
                        src={bid.freelancerImg || "https://via.placeholder.com/100x100"}
                        alt="Freelancer"
                      />
                    </td>
                    <td>${bid.bidAmount}</td>
                    <td>{bid.freelancerName || "Anonymous"}</td>
                    <td>{bid.proposal}</td>
                    <td>
                      <img className="message-icon" src="/img/message.png" alt="Message" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="right">
          <div className="price">
            <h2>Budget :${project.budget}</h2>
          </div>
          <p>Category: {project.category}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>
                Delivery:{" "}
                {new Date(project.expected_delivery_time).toLocaleDateString()}
              </span>
            </div>
            <div className="item">
              <span>Specifications</span>
            </div>
          </div>
          <div className="features">
            {project.specifications.map((spec, index) => (
              <div className="item" key={index}>
                <img src="/img/greencheck.png" alt="" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Project;
