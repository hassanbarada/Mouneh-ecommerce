import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import './Admin.css';
import { useNavigate } from "react-router-dom";


const Users = () => {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

  
    // get all users
    const getAllUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
  
        // Set the token in the request headers
        const headers = {
          token: `Bearer ${token}`,
        };
  
        const { data } = await axios.get("http://localhost:3001/users", { headers });
        setUsers(data);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong getting users");
      }
    };
  
    // lifecycle method
    useEffect(() => {
      getAllUsers();
    }, []);
    const handleDeleteUser = async (userId) => {
        try {
          const token = localStorage.getItem('access_token');
          const headers = {
            token: `Bearer ${token}`,
          };
    
          await axios.delete(`http://localhost:3001/users/${userId}`, { headers });
    
          // If the deletion is successful, remove the deleted user from the state
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    
          toast.success("User deleted successfully!");
        } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong deleting user");
        }
      };
    
      // Fetch users on component mount
      useEffect(() => {
        getAllUsers();
      }, []);

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
            <div className="dash col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="userlist text-center">All Users</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>City</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstname} {user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.phonenumber}</td>
                      <td>{user.city}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete User
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
  export default Users;