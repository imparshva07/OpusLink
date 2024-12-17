/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {React, useState, useContext, useEffect} from 'react'
import "./Home.css"
import Featured from '../../components/featured/Featured'
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import { UserContext } from "../../context/UserContext";
import { cards } from "../../data";
import axios from 'axios';

const Home = () => {
  const [projectData, setProjectData] = useState("");
  const { currentUser } = useContext(UserContext);

  

  useEffect(() => {
    const initialiseData = async () => {
      try {

        if(currentUser && currentUser.isClient) {
          const response = await axios.get(`http://localhost:3000/api/projects/client/${currentUser._id}`);
          setProjectData(response.data);
        }

        if(currentUser && !currentUser.isClient) {
          const response = await axios.get(`http://localhost:3000/api/projects/`);
          setProjectData(response.data);
        }
        
      } catch (error) {
        console.error("Error searching projects:", error);
      }
    };
    initialiseData();
  }, []);

  return (
<div className="home">
  <Featured setProjectData={setProjectData} />
  <Slide slidesToShow={5} arrowsScroll={5} projectData={projectData}>
    {Array.isArray(projectData) && projectData.length > 0 ? (
      projectData.map((card) => <CatCard key={card._id} card={card} />)
    ) : (
      <p>No projects available</p>
    )}
  </Slide>
</div>

  )
}

export default Home
