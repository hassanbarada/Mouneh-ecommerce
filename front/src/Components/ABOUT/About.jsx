import React from "react";
import "./About.css";
import Myimage from "../../images/boho-macrame-assortment-indoors.jpg";
import {Link} from "react-router-dom";

function AboutUs(){
    return(
        <>
         <h1 className="aboutus-header">A<span className="white-span">B</span>O<span className="white-span">U</span>T US <i className="fa-solid fa-jar fa-bounce"></i></h1>
       <div className="AboutUs-container">
            
        <div className="content">
            <h2 className="aboutus-header2">Welcome to Home Grown</h2>
            <p className="mg">Your one-stop destination for all things homemade and handcrafted! At Home Grown,
               we take pride in fostering a vibrant community of passionate individuals who share their love for homemade
               delicacies and unique handcrafts. Our platform serves as a virtual marketplace where talented creators can 
               showcase and sell their mouthwatering mouneh, adding a touch of tradition to every kitchen. 
               But that's not all! We also go the extra mile by providing step-by-step tutorials, enabling everyone 
               to master the art of preparing their own mouneh and exploring the joy of culinary creativity.
               But the goodness doesn't stop there! We understand the importance of supporting artisans and their artistry,
                which is why we embrace a variety of handcrafted treasures. </p>
            <p className="mg">So, whether you're here to find delectable homemade treats, 
               learn the age-old secrets of mouneh preparation, or discover and acquire stunning handcrafted pieces, 
               Home Grown is here to make your journey an enriching and delightful experience. Join us in this heartwarming 
               venture as we celebrate the beauty of homemade and the art of handcrafted creativity. Together, let's cultivate a 
               thriving community of passionate artisans and connoisseurs, right here at Home Grown!</p>
               <button className="mg aboutus-btn"><Link to="/contact">Contact Us</Link></button>
        </div>
        <div className="img">
            <img src={Myimage} alt="Description" className="custom-img" />
        </div>
    </div>
        
        </>
    )
}
export default AboutUs;