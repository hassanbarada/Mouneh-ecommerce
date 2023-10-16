import React, { useState, useEffect } from 'react';
import './Editprofile.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    password: '',
  });

  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [phonenumberError, setPhonenumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const notify = () =>
    toast.success('Profile Edited', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const api = 'http://localhost:3001';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userID = localStorage.getItem('userId');
    axios
      .get(`${api}/users/find/${userID}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userData = response.data;
        setFormData({
          firstname: userData.firstname,
          lastname: userData.lastname,
          phonenumber: userData.phonenumber,
          email: userData.email,
          password: '',
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          console.error('Token is not valid!');

          // Navigate to login page if token is not valid
          navigate('/login');
        } else {
          console.error('Profile update failed:', error);
        }
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const userID = localStorage.getItem('userId');

    setFirstnameError('');
    setLastnameError('');
    setPhonenumberError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!token) {
      navigate('/login');
      return;
    }

    if (!formData.firstname) {
      setFirstnameError('First Name is required');
      isValid = false;
    }
    if (!formData.lastname) {
      setLastnameError('Last Name is required');
      isValid = false;
    }
    if (!formData.phonenumber) {
      setPhonenumberError('Phone Number is required');
      isValid = false;
    }
    if (!formData.email) {
      setEmailError('Email Address is required');
      isValid = false;
    }
    if (!formData.password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.put(
          `${api}/users/${userID}`,
          formData,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log('Profile updated successfully!');
        console.log(response);
        notify();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error('Token is not valid!');

          // Navigate to login page if token is not valid
          navigate('/login');
        } else {
          console.error('Profile update failed:', error);
        }
      }
    }
  };

  return (
    <section className="edit-profile">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="edit-profile-container">
        <div className="edit-profile-container-content">
          <h2 className="center edit-profile-container-header2">
            EDIT YOUR PROFILE
          </h2>
          <p className="center edit-profile-container-par">
            PLEASE ENTER YOUR NEW INFORMATION
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="flexSb">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                id="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                id="lastname"
                className="left"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            {firstnameError && (
              <span className="error-message">{firstnameError}</span>
            )}
            {lastnameError && (
              <span className="error-message">{lastnameError}</span>
            )}
            <input
              type="number"
              name="phonenumber"
              placeholder="Phone Number"
              value={formData.phonenumber}
              onChange={handleInputChange}
            />
            {phonenumberError && (
              <span className="error-message">{phonenumberError}</span>
            )}
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
            {emailError && (
              <span className="error-message">{emailError}</span>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {passwordError && (
              <span className="error-message">{passwordError}</span>
            )}
            <div className="centering">
              <button type="submit" className="editprofile-btn">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Editprofile;
