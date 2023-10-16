import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const WorkshopConfirmation = () => {
  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('userId');
  const params = useParams();
  const capacity = params.capacity;
  const workshopID = params.workshopID;

  const registrationData = {
    userId: userId,
  };

  const updateddata = {
    capacity: capacity - 1,
  };

  try {
    axios.post(`http://localhost:3001/registeruserworkshop/${workshopID}`, registrationData, {
      headers: {
        token: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Registration successful:', response.data);
        try {
          axios.put(`http://localhost:3001/workshopupdate/${workshopID}`, updateddata, {
            headers: {
              token: `Bearer ${token}`,
            },
          })
            .then(response => {
              console.log('Capacity updated successfully:', response.data);
            })
            .catch(error => {
              console.error('Update capacity failed:', error.response.data);
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch(error => {
        console.error('Registration failed:', error.response.data);
      });
  } catch (err) {
    console.log(err);
  }


  const generatedLink = "https://zoom.us/j/WorkshopMeetingID";

  return (
    <div className="bg-amber-900 h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-2xl text-yellow-600 font-semibold mb-4">
          Thank you for registering!
        </h2>
        <p className="text-amber-900">
          -You will receive an email containing all the workshop details.
        </p>
        <p className="text-amber-900">
          -Additionally, you can access the workshop chat.
        </p>
        <p className="text-amber-900">
          -Below, you will find the Zoom link for the workshop.
        </p>
        <p className="mt-4 text-amber-900">
          Zoom Link:
          <br />
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {generatedLink}
          </a>
        </p>
      </div>
    </div>
  );
};

export default WorkshopConfirmation;
