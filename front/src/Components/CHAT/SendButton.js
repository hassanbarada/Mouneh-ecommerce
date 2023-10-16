// RegisterButton.jsx
import React from "react";
import axios from "axios";
import { useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";


const SendButton = ({ workshop }) => {
  const { workshopid } = useParams();
  const userId = localStorage.getItem('userId');


  const [formData, setFormData] = useState({
    user: userId,
    message: ' ',
    workshop: workshopid
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the target
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSend = async (e) => {
    e.preventDefault();

    // Check if the message is not an empty string
    if (formData.message.trim() === "") {
      console.log("Message is empty. Not sending.");
      return; // Exit the function without making the API call
    }

    const token = localStorage.getItem('access_token');
    console.log(localStorage.getItem('userId'));
    console.log(token);

    try {
      const response = await axios.post(`http://localhost:3001/chat`, formData, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log("Message sent successfully!");
      console.log(response);
    } catch (error) {
      console.error("Message sending failed:", error);
    }

    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSend} className="form-button">
        <input type="text" placeholder="Type message here..." className="message-input" id="message" name="message" onChange={handleInputChange} />
        <button
          onClick={handleSend}
          className="btn-send"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default SendButton;
