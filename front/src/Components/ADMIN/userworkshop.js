import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import './Admin.css';
import treeImage from '../../images/Recipe book.gif';  
import craftImage from '../../images/Left hander.gif';  
import { FaTrash } from 'react-icons/fa'; // Import the delete icon from react-icons/fa

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);

  const getWorkshopsWithRegisteredUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        token: `Bearer ${token}`,
      };

      const { data } = await axios.get("http://localhost:3001/allworkshop", { headers });

      // Fetch registered users for each workshop and filter workshops with registered users
      const workshopsWithRegisteredUsers = await Promise.all(data.map(async (workshop) => {
        const response = await axios.get(`http://localhost:3001/${workshop._id}/registered-users`, { headers });
        return { ...workshop, registeredUsers: response.data };
      }));

      const workshopsWithUsers = workshopsWithRegisteredUsers.filter((workshop) => workshop.registeredUsers.length > 0);

      setWorkshops(workshopsWithUsers);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong getting workshops");
    }
  };

  useEffect(() => {
    getWorkshopsWithRegisteredUsers();
  }, []);

  const handleDeleteUserFromWorkshop = async (workshopId, userId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        token: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:3001/${workshopId}/unregister/${userId}`, { headers });

      // Remove the user from the registeredUsers list
      setWorkshops((prevWorkshops) => {
        const updatedWorkshops = prevWorkshops.map((w) => {
          if (w._id === workshopId) {
            const updatedRegisteredUsers = w.registeredUsers.filter((user) => user._id !== userId);
            return { ...w, registeredUsers: updatedRegisteredUsers };
          }
          return w;
        });
        return updatedWorkshops;
      });

      toast.success("User unregistered from workshop successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while unregistering user from workshop");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="row dashboard">
        <div className="col-md-3 dash">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="waitinglist text-center">Workshops with Registered Users</h1>
          <div className="product-list">
            {workshops.length === 0 ? (
              <p className="no-products-message">No Workshops with Registered Users To Show....</p>
            ) : (
              workshops.map((w) => (
                <div className="product-item m-4 d-flex" style={{ width: "80%" }} key={w._id}>
                  <div className="product-image-container " style={{ width: "25%" }}>
                    <img
                      src={w.category === 'Food' ? treeImage : craftImage}
                      className="product-image w-100 h-auto"
                      alt={w.title}
                    />
                  </div>
                  <div className="product-info-container ml-4" style={{ width: "50%" }}>
                    <h5 className="product-title">{w.title}</h5>
                    <div className="product-info-row">
                      <p className="product-label product-data">
                        Category:<span className="product-data">{w.category}</span>
                      </p>
                    </div>
                    <div className="product-info-row">
                      <p className="product-label product-data">
                        Price:<span className="product-data">{w.price} $</span>
                      </p>
                    </div>
                    <div className="product-info-row">
                      <p className="product-label product-data">
                        Description: <span className="product-data">{w.description}</span>
                      </p>
                    </div>
                    <div className="registered-users">
                    <span className="product-data">Registered Users:</span>
                    
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {w.registeredUsers.map((user) => (
                            <tr key={user._id}>
                              <td>{user.firstname} {user.lastname}</td>
                              <td>
                                <button
                                  className="btn btn-link btn-sm"
                                  onClick={() => handleDeleteUserFromWorkshop(w._id, user._id)}
                                >
                                  <FaTrash /> {/* Delete icon */}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
                          }  
export default Workshops;
