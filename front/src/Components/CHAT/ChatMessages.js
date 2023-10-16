import React, { useState, useEffect } from "react";
import MyMessages from "./MyMessages";
import axios from "axios";
import { useParams } from 'react-router-dom';

const baseUrl = "http://localhost:3001/getAllChat";
const token = localStorage.getItem('access_token');
const userId = localStorage.getItem('userId');
const UserMessages = () => {

  const { workshopid } = useParams();
  console.log("this is the workshop id :", workshopid);
  const getMessages = (setChat) => {
    axios
      .get(`${baseUrl}/${workshopid}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log("user id:", userId);
        console.log('data --->', data);
        setChat(data);
      })
      .catch((err) => console.log(err));
  };
  const [message, setMessage] = useState([]);

  useEffect(() => {
    getMessages(setMessage); // Use userId retrieved from localStorage
  }, []);

  return (

    <div className="Chats-list">
      <h1 className="mychats"></h1>
      {message === null ? (
        <p>Loading...</p>
      ) : message && Array.isArray(message.message) ? (
        message.message.map((item) => (
          <MyMessages key={item._id} id={item._id} user={item.user}
            message={item.message} />
        ))
      ) : (
        <p className="mychats">No Chats available.</p>
      )}
    </div>
  );
};

export default UserMessages;