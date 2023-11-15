import React from "react";
import { Logo } from '../components'
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from 'react-router-dom' 
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info div */}
        <div className="info">
          <h1>
            Jobs <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis
            nobis laudantium saepe deserunt dolorem. Quisquam repellendus quis,
            cupiditate ipsum dolores ex odit, voluptas quae, molestiae quod
            perferendis magnam magni expedita.
          </p>
          <button className="btn btn-hero">
            <Link to="/register">register/login</Link>
          </button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};




export default Landing;
