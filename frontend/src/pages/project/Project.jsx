import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Project.css";
import { Slider } from "infinite-react-carousel/lib";

function Project() {
  const { id } = useParams(); 
  const [project, setProject] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/${id}`); 
        setProject(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false); 
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
            <img
              className="pp"
              src={project.img}
              alt="Project Image"
            />
            <span>Project by {project.userId}</span>
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>5</span>
            </div>
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            <img src={project.img} alt="Project Slide 1" />
            <img src="https://via.placeholder.com/300x200" alt="Placeholder Slide 2" />
            <img src="https://via.placeholder.com/300x200" alt="Placeholder Slide 3" />
          </Slider>
          <h2>About This Project</h2>
          <p>{project.description}</p>
          <div className="seller">
            <h2>About The Artist</h2>
            <div className="user">
              <img
                src={project.img}
                alt="Artist"
              />
              <div className="info">
                <span>Artist ID: {project.userId}</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">USA</span>
                </div>
                <div className="item">
                  <span className="title">Member Since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. Response Time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last Delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>{project.specifications.join(', ')}</p>
            </div>
          </div>
          <div className="reviews">
            <h2>Customer Reviews</h2>
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://via.placeholder.com/100x100"
                  alt="User Profile"
                />
                <div className="info">
                  <span>John Doe</span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt="Country"
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>Excellent project, on time and on budget.</p>
            </div>
            <hr />
          </div>
        </div>
        <div className="right">
          <div className="price">
            <h2>Budget :${project.budget}</h2>
          </div>
          <p>{project.description}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>Delivery: {new Date(project.expected_delivery_time).toLocaleDateString()}</span>
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
