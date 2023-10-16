import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const MyMessages = ({ user, message }) => {
  const baseUrl = "http://localhost:3001/getUsername";
  const userId = user;
  const token = localStorage.getItem('access_token');
  const userIdd = localStorage.getItem('userId');
  const isUserMessage = user === userIdd;

  const getUserName = (setUsername) => {
    axios
      .get(`${baseUrl}/${userId}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log('data --->', data);
        setUsername(data.firstname.firstname); // Update this line
      })
      .catch((err) => console.log(err));
  };

  const [username, setUsername] = useState("Loading...");

  useEffect(() => {
    getUserName(setUsername);
  }, []);

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`bg-yellow-900 text-white rounded-lg p-2 ${isUserMessage ? "ml-auto" : "mr-auto"} max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl`}>
        {isUserMessage ? (
          <span className="text-yellow-500">You: </span>
        ) : (
          <span className="text-yellow-500">{`${username}:  `}</span>
        )}
        {message}
      </div>
    </div>


  );



};

export default MyMessages;
