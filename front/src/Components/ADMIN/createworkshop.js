import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import './Admin.css';
import { useNavigate } from "react-router-dom";
import workImage from '../../images/Resume.gif';


const CreateWorkshop = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const workshopData = {
        title,
        price,
        capacity,
        duration,
        description,
        category,
      };

      const token = localStorage.getItem('access_token');

      const headers = {
        token: `Bearer ${token}`,
      };

      const { data } = await axios.post(
        "http://localhost:3001/workshop",
        workshopData,
        { headers }
      );

      console.log("Workshop creation response:", data);
      if (data?.success) {
        toast.success("Workshop created successfully!");
      } else {
        toast.success("Workshop created successfully!");
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong while creating the workshop");
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
      <div className="container">
        <div className="row dashboard">
          <div className="dashinsert col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="create-workshop-container">
              <h1 className="workshopheader">Create Workshop</h1>
              <div className="d-flex">
              <div className="cont m-1 w-75">
                <form className="workshopcontainer"> 
                  <div className="row ">
                  <div className="mb-3">
                    <label>Category:</label>
                    <select
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label>Workshop Title:</label>
                        <input
                          type="text"
                          value={title}
                          className="form-control"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label>Price:</label>
                        <input
                          type="number"
                          value={price}
                          className="form-control"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label>Capacity:</label>
                        <input
                          type="number"
                          value={capacity}
                          className="form-control"
                          onChange={(e) => setCapacity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label>Duration:</label>
                        <input
                          type="number"
                          value={duration}
                          className="form-control"
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label>Workshop Description:</label>
                    <textarea
                      type="text"
                      value={description}
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-3 text-end">
                    <button className="btn btn-primary" onClick={handleCreate}>
                      CREATE WORKSHOP
                    </button>
                  </div>
                </form>
              </div>
              <div className="workshop-image-container">
            <img
              src={workImage} 
              alt="workshop Image"
              className="product-image"
            />
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
 };

export default CreateWorkshop;
