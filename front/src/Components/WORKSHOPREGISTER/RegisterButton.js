import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./WSRegister.css";

const RegisterButton = ({ workshop }) => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (userId && token) {
      axios.get(`http://localhost:3001/isregistered/${userId}/${workshop._id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
        .then(response => {
          setIsRegistered(response.data.isRegistered);
        })
        .catch(error => {
          console.error('Error checking registration:', error.response.data);
        });
    }
  }, [userId, token, workshop._id]);

  const handleRegister = () => {
    if (isRegistered) {
      toast.error("You are already registered for this workshop.");
      return;
    }

    if (!token) {
      navigate('/login');
      return;
    }

    axios.post("http://localhost:3001/stripe/create-checkout-session", {
      workshop
    })
      .then((res) => {
        if (res.data && res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button
        onClick={handleRegister}
        className="btnRegis"
        style={{
          background: "#6B4423",
          width: "200px",
          height: "5vh",
          borderRadius: "7px",
          color: "white",
        }}
        disabled={isRegistered}
      >
        {isRegistered ? "Registered" : "Register Now"}
      </button>
    </>
  );
};

export default RegisterButton;
