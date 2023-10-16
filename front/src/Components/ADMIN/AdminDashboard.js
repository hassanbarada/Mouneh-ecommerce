import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import axios from "axios"; // Import axios for making API requests
import jwt_decode from "jwt-decode"; 
import './Admin.css';
import userimage from '../../images/Profile data.gif';


const AdminDashboard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const isAdmin = localStorage.getItem('isAdmin');

  useEffect(() => {
    // Check if the user is not an admin or there is no token
    if (isAdmin === "false" || !token) {
      // Navigate to the login page
      navigate('/login'); // Change '/login' to your actual login route
      return;
    }

    // Function to fetch user data and update the state
    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            token: `Bearer ${token}`,
          },
        };
        const decodedToken = jwt_decode (token);

        const userID = decodedToken.user.id;
        const response = await axios.get(`http://localhost:3001/users/find/${userID}`, config);
        setUserData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.log("Token is not valid!");
          navigate('/login');
        } else {
          console.error("Cart Add failed:", error);
        }      }
    };

    fetchUserData();
  }, [token, isAdmin]);

  return (
    <div className="container-fluid dashboard">
    <div className="row admindashboard">
      <div className="dashadmin col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h2 className="carda w-100">User Profile</h2>
        <div className="d-flex align-items-center">
          <img
            src={userimage} 
            alt="User Profile"
            className="profile-image"
          />
          <div className="cardadmindash w-50 p-3">
            <div className="info-row">
              <span className="cardinfo">Full Name: </span>
              <span className="infoadmin">{`${userData.firstname} ${userData.lastname}`}</span>
            </div>
            <div className="info-row">
              <span className="cardinfo">Email:</span>
              <span className="infoadmin">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="cardinfo">Mobile: </span>
              <span className="infoadmin">{userData.phonenumber}</span>
            </div>
            <div className="info-row">
              <span className="cardinfo">Age: </span>
              <span className="infoadmin">{userData.age}</span>
            </div>
            <div className="info-row">
              <span className="cardinfo">City: </span>
              <span className="infoadmin">{userData.city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;
