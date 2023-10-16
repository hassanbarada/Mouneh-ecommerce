import React, { useState, useEffect } from "react";
import MyChats from "./MyChats";
import axios from "axios";
import { getChat } from "./HandleChatApi";
import "./UserChats.css";
const userId = localStorage.getItem('userId');

const UserChat = () => {

  const [userws, setUserws] = useState([]);

  useEffect(() => {
    getChat(userId, setUserws); // Use userId retrieved from localStorage
  }, []);

  console.log("User workshops state:", userws);

  return (
    <div className="Chats-list">
      <h1 className="mychats">My Chats</h1>
      {userws === null ? (
        <p>Loading...</p>
      ) : userws && Array.isArray(userws.userws) ? (
        userws.userws.map((item) => (
          <MyChats key={item._id} id={item._id} userworkshopId={item.userworkshopId} title={item.title} />
        ))
      ) : (
        <p className="mychats">No Chats available.</p>
      )}
    </div>
  );

};

export default UserChat;
