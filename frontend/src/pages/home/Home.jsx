/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Home() {
  const [projectData, setProjectData] = useState("");
  const { currentUser } = useContext(UserContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const initialiseData = async () => {
      try {
        if (currentUser && currentUser.isClient) {
          const response = await axios.get(
            `http://localhost:3000/api/projects/client/${currentUser._id}`
          );
          setProjectData(response.data);
        }

        if (currentUser && !currentUser.isClient) {
          const response = await axios.get(
            `http://localhost:3000/api/projects/`
          );
          setProjectData(response.data);
        }
      } catch (error) {
        console.error("Error searching projects:", error);
      }
    };
    initialiseData();
  }, []);

  const handleSearch = async () => {
    try {
      if (currentUser && currentUser.isClient) {
        const response = await axios.get(
          `http://localhost:3000/api/projects/search/${currentUser._id}`,
          {
            params: { query },
          }
        );
        setProjectData(response.data);
      }
      if (currentUser && !currentUser.isClient) {
        const response = await axios.get(
          "http://localhost:3000/api/projects/search",
          {
            params: { query },
          }
        );
        setProjectData(response.data);
      }
    } catch (error) {
      console.error("Error searching projects:", error);
    }
  };

  const sliderSettings = {
    infinite: projectData.length > 3,
    speed: 500,
    slidesToShow: projectData.length >= 3 ? 3 : projectData.length,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
  };


  return (
    <div className="home">
      <div className="featured">
        <div className="container">
          <div className="left">
            {/* <h1>
              Discover the ideal <span>freelance</span> solutions for your needs
            </h1> */}
            {currentUser && currentUser.isClient && (
              <h1>
                Search <span>Your</span> Projects Here
              </h1>
            )}
            {currentUser && !currentUser.isClient && (
              <h1>
                Discover the ideal <span>freelance</span> solutions for your
                needs
              </h1>
            )}
            <div className="search">
              <div className="searchInput">
                <img src="./img/search-blue.png" alt="" />
                {/* <input type="text" placeholder='Try "Web Development"' /> */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for projects..."
                />
              </div>
              <button onClick={handleSearch}>Find</button>
            </div>
            <div className="popular">
              <span>Trending:</span>
              <button>App Development</button>
              <button>eCommerce</button>
              <button>SEO Optimization</button>
              <button>Machine Learning</button>
            </div>
          </div>
          <div className="right">
            <img src="./img/dashboard-img.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="slider">
        <Slider {...sliderSettings}>
          {Array.isArray(projectData) && projectData.length > 0
            ? projectData.map((project) => (
                <div key={project._id} className="catCard">
                  <Link
                    to={`/project/${project._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={
                        project.img ||
                        "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      }
                      alt={project.title}
                    />
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </Link>
                </div>
              ))
            : (
              <p>No projects available</p>
            )}
        </Slider>
      </div>

      <div className="whyOpusLinkContainer">
        <h2>
          Why <span>OPUSLINK?</span>
        </h2>
        <div className="whyOpusLink">
          <div className="card">
            <h3>Trusted Professionals</h3>
            <p>
              Work with verified and experienced freelancers for high-quality
              results.
            </p>
          </div>
          <div className="card">
            <h3>Secure Payments</h3>
            <p>
              Our payment system ensures safety and transparency for both
              clients and freelancers.
            </p>
          </div>
          <div className="card">
            <h3>Global Reach</h3>
            <p>
              Connect with professionals or clients from all around the world.
            </p>
          </div>
          <div className="card">
            <h3>Efficient Matching</h3>
            <p>
              Our platform uses smart algorithms to match you with the best
              talent or project.
            </p>
          </div>
          <div className="card">
            <h3>Skilled Professionals</h3>
            <p>
              Connect with skilled freelancers for efficient project solutions.
            </p>
          </div>
          <div className="card">
            <h3>Quality Services</h3>
            <p>
              Find reliable talent for your projects with top-notch services.
            </p>
          </div>
          <div className="card">
            <h3>Affordable Rates</h3>
            <p>Get great results at competitive prices.</p>
          </div>
          <div className="card">
            <h3>Flexible Options</h3>
            <p>Choose freelancers based on your budget and timeline.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
