import React from "react";
import "./UserChats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const MyChats = (props) => {
  return (
    <>
      <Link to={`/chat/${props.userworkshopId}`} >
        <button className="chat bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-md flex items-center">
          <h1 className="chat-title text-lg font-semibold flex-grow">{props.title}</h1>
          <FontAwesomeIcon icon={faComment} className="text-#78350f ml-2" />
        </button>
      </Link>
    </>
  );
};

export default MyChats;
