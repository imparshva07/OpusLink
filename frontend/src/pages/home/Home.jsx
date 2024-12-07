import React from 'react'
import "./Home.css"
import Featured from '../../components/featured/Featured'
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import { cards } from "../../data";

const Home = () => {
  return (
    <div className='home'>
      <Featured/>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  )
}

export default Home