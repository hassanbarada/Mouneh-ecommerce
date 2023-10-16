import React, { useState, useEffect, useMemo } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomeLandPageImage1 from '../../images/Simple_Handmade_Gifts_-_Part_Six-removebg-preview.png'
import HomeLandPageImage2 from "../../images/Bringing_Spring_Inside_with_Plants-removebg-preview.png";
import HomeLandPageImage3 from "../../images/Chili_Oil-removebg-preview.png";
import HomeLandPageImage4 from '../../images/Simple_Stuffed_Makdous_Recipe__cured_eggplant_-removebg-preview.png'
import HomeLandPageImage5 from "../../images/Garlic_Olive_Oil-removebg-preview.png";
import HomeLandPageImage6 from "../../images/Maple_Mustard_Chicken_Baked_in_the_Oven-_Nerds_with_Knives-removebg-preview.png";
import Swiper from "../SWIPER/Swiper";
import {motion} from 'framer-motion';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const token = localStorage.getItem('access_token');
  
  // Wrap the initialization of 'images' in useMemo to memoize the array
  const images = useMemo(() => [HomeLandPageImage1,HomeLandPageImage2,HomeLandPageImage3,HomeLandPageImage4,HomeLandPageImage5,HomeLandPageImage6], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className="landpage-section">
        <motion.div className="landpage-section-left"
        variants={{
          hidden:{opacity: 0,x: -75},
          visible:{opacity: 1,x: 0},
        }}
        initial="hidden"
        animate="visible"
        transition={{duration:1}}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`image-slider ${
                index === currentImageIndex ? "active" : ""
              }`}
            />
          ))}
        </motion.div>
        <div className="landpage-section-right" >
          <motion.h1 className="landpage-section-right-header"
          variants={{
            hidden:{opacity: 0,x: 75},
            visible:{opacity: 1,x: 0},
          }}
          initial="hidden"
          animate="visible"
          transition={{duration:0.5,delay:0.3}}
          >Artisanal Delights</motion.h1>
          <motion.h4 className="landpage-section-right-header4"
          variants={{
            hidden:{opacity: 0,x: 75},
            visible:{opacity: 1,x: 0},
          }}
          initial="hidden"
          animate="visible"
          transition={{duration:0.5,delay:0.4}}
          >Savor the Essence of Handcrafted Mouneh</motion.h4>
          <div className="landpage-section-right-btn">
            {!token ? <motion.button 
            variants={{
              hidden:{opacity: 0,x: 75},
              visible:{opacity: 1,x: 0},
            }}
            initial="hidden"
            animate="visible"
            transition={{duration:0.5,delay:0.5}}
            ><Link to="/login">Get Started</Link></motion.button> :
            <motion.button 
            variants={{
              hidden:{opacity: 0,x: 75},
              visible:{opacity: 1,x: 0},
            }}
            initial="hidden"
            animate="visible"
            transition={{duration:0.5,delay:0.5}}
            ><Link to="/Cart">Add To Cart</Link></motion.button>
             }
            <motion.button 
            variants={{
              hidden:{opacity: 0,x: 75},
              visible:{opacity: 1,x: 0},
            }}
            initial="hidden"
            animate="visible"
            transition={{duration:0.5,delay:0.5}}
            ><Link to="/showProducts/All">Products</Link></motion.button>
          </div>
        </div>
      </div>

    <Swiper/>
    </>
  );
};

export default Home;
