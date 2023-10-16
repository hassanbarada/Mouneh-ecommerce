import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import './Admin.css';
import { useNavigate } from "react-router-dom";



const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();


  const getAllWorkshops = async () => {
    try {
      const token = localStorage.getItem('access_token');

      const headers = {
        token: `Bearer ${token}`,
      };

      const { data } = await axios.get("http://localhost:3001/allworkshop", { headers });
      setWorkshops(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong getting workshops");
    }
  };

  useEffect(() => {
    getAllWorkshops();
  }, []);

  const handleDeleteWorkshop = async (workshopId) => {
    try {
      const token = localStorage.getItem('access_token');

      const headers = {
        token: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:3001/delete/${workshopId}`, { headers });

      setWorkshops((prevWorkshops) => prevWorkshops.filter((w) => w._id !== workshopId));

      toast.success("Workshop deleted successfully!");

    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong delete workshop");
    }
  };

  // Check if the user is an admin, if not redirect to restricted page
  const isAdmin = localStorage.getItem('isAdmin');
  const token = localStorage.getItem('access_token');
  if (isAdmin === 'false' || !token) {
    navigate('/login'); // Replace '/restricted' with your actual restricted access route
    return null;
  }

 
return (
  <>
      <Toaster position="top-right" />
      <div className="row dashboard">
        <div className="dashworkshop col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="workshoplistheader text-center">All Workshops List</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((w, index) => (
                <tr key={w._id}>
                  <td>{w.title}</td>
                  <td>{w.category}</td>
                  <td>{w.price} $</td>
                  <td>{w.description}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteWorkshop(w._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
);
  
};

export default Workshops;
