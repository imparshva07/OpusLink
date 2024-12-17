/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import "./Project.css";
import BidModal from "../../components/bidModal/BidModal";
import { UserContext } from "../../context/UserContext";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [userBid, setUserBid] = useState("")
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setShowBidModal(true)
  }

  const handleCloseModal = () => {
    setShowBidModal(false)
  }
  
  const handleOpenMessaging = async (freelancerId) => {
    try {
      // Step 1: Initiate the chat with the backend
      const { data } = await axios.post("http://localhost:3000/api/chat/initiate", {
        clientId: currentUser._id,
        freelancerId,
      });

      // Step 2: Store chatId in localStorage for consistency (optional)
      localStorage.setItem("currentChatId", data._id);

      // Step 3: Redirect to the messaging page with chatId
      navigate(`/messages`);
    } catch (error) {
      console.error("Error initiating chat:", error.message);
    }
  };

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
        if (currentUser.isClient) {
          await fetchBids(response.data._id); 
        }
        if (!currentUser.isClient) {
          findCurrentUserBid(response.data._id);
        }
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
        const response = await axios.get(`http://localhost:3000/api/bids/project/${projectId}`);
        setBids(response.data);
      } catch (error) {
        console.error("Error fetching bids:", error);
        setBids([]);
      }
    };

    const findCurrentUserBid = async (projectId) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/bids/project/${projectId}`);
        if (Array.isArray(response.data) && response.data.length !== 0) {
          const userBid = response.data.find(bid => bid.freelancerId._id === currentUser._id);
          console.log(userBid)
          if (userBid) {
            setUserBid(userBid);
            setBidSubmitted(true);
          }
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };
    fetchProject();
  }, [id, bidSubmitted]);

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
            src={project.img}
            alt="Project Image"
            className="project-image"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <h2>About This Project</h2>
          <p>{project.description}</p>
          {currentUser.isClient && (
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
                      <td>{bid.freelancerId.name || "Anonymous"}</td>
                      <td>{bid.proposal}</td>
                      <td>
                        {currentUser.isClient && (
                          <button onClick={() => handleOpenMessaging(bid.freelancerId._id)}>
                            Message
                          </button>
                        )}
                      </td>
                      {/* <td>
                        <img onClick={() => handleOpenMessaging(bid.freelancerId._id)} className="message-icon" src="/img/message.png" alt="Message" />      
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!currentUser.isClient && (
            <div className="bids-section">
              <h2>Your Bid for this Project</h2>
              <table className="bids-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Bid Amount</th>
                    <th>Freelancer</th>
                    <th>Proposal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        className="bid-image"
                        src={userBid?.freelancerImg || "https://via.placeholder.com/100x100"}
                        alt="Freelancer"
                      />
                    </td>
                    <td>${userBid?.bidAmount}</td>
                    <td>{userBid?.freelancerId?.name || "Anonymous"}</td>
                    <td>{userBid?.proposal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
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
          {!currentUser.isClient && bidSubmitted && (
            <>
              <button onClick={handleOpenModal} disabled>Submit Bid</button>
              <span>You have already submitted the bid!</span>
            </>
          )}
          {!currentUser.isClient && !bidSubmitted && (<button onClick={handleOpenModal}>Submit Bid</button>)}
        </div>
      </div>
      {showBidModal && (
        <BidModal project={project} showModal={showBidModal} handleClose={handleCloseModal} setBidSubmitted={setBidSubmitted} />
      )}
    </div>
  );
}

export default Project;
