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
  const [projectData, setProjectData] = useState([]);
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
    if (currentUser) initialiseData();
  }, [currentUser]);

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
    slidesToShow:
      projectData.length > 0
        ? projectData.length >= 3
          ? 3
          : projectData.length
        : 1,
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
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for projects..."
                />
              </div>
              <button onClick={handleSearch}>Find</button>
            </div>
          </div>
          <div className="right">
            <img src="./img/dashboard-img.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="slider">
        <Slider {...sliderSettings}>
          {Array.isArray(projectData) && projectData.length > 0 ? (
            projectData.map((project) => (
              <div
                key={project._id ? project._id : project.id}
                className="catCard"
              >
                <Link
                  to={`/project/${project._id ? project._id : project.id}`}
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
          ) : (
            <p>No projects available</p>
          )}
        </Slider>
      </div>

      <div className="whyOpusLinkContainer">
        <h2>Who are we?</h2>
        <div className="whyOpusLink">
          <div className="card">
            <Link
              to={`https://www.linkedin.com/in/chaurasiaankit`}
              target="_blank"
            >
              <h3>Ankit Durgaprasad Chaurasia</h3>
              <p>LinkedIn: https://www.linkedin.com/in/chaurasiaankit</p>
            </Link>
          </div>
          <div className="card">
            <Link
              to={`https://www.linkedin.com/in/imparshva07`}
              target="_blank"
            >
              <h3>Parshva Shah</h3>
              <p>LinkedIn: https://www.linkedin.com/in/imparshva07</p>
            </Link>
          </div>
          <div className="card">
            <Link
              to={`https://www.linkedin.com/in/keyur-patel-13a6011a3`}
              target="_blank"
            >
              <h3>Keyur Patel</h3>
              <p>LinkedIn: https://www.linkedin.com/in/keyur-patel-13a6011a3</p>
            </Link>
          </div>
          <div className="card">
            <Link
              to={`https://www.linkedin.com/in/yash-gandhi-56a4a0221`}
              target="_blank"
            >
              <h3>Yash Gandhi</h3>
              <p>LinkedIn: https://www.linkedin.com/in/yash-gandhi-56a4a0221</p>
            </Link>
          </div>
          <div className="card">
            <Link
              to={`https://www.linkedin.com/in/codewithappy`}
              target="_blank"
            >
              <h3>Arpit Shah</h3>
              <p>LinkedIn: https://www.linkedin.com/in/codewithappy</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
