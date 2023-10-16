import React,{useEffect} from "react";
import "./404.css";
import chef from "../../images/Chef-bro.png";
import { Link,useNavigate  } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    goToNewRoute();
  }, []);

  const goToNewRoute = () => {
    navigate("/*");
  };

  return (
    <>
    <div className="notfound-body">
    <div className="notfound-container">
       <div className="notfound-content"> 404 </div> 
       <img src={chef} className="chef-photo"/>
       <p className="parag-notfound">Page Not Found</p>
       <p className="parag-two-notfound">The requested URL was not found on this server!</p>
       <button className="notfound-btn"><Link to="/">Go Home</Link></button>
     </div>
    </div>
    
    </>
  )
}

export default NotFound;