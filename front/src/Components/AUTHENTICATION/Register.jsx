import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    city: "",
    age: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registerError, setregisterError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }
  
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword((prevState) => !prevState);
  }


  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "password") {
      setPasswordError("");
    }
  
    if (name === "confirmPassword") {
      setConfirmPasswordError("");
      setConfirmPassword(value); // Update the confirmPassword state
    }

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  function hsn(e) {
    e.preventDefault();

    setNameError("");
    setLastNameError("");
    setMobileError("");
    setAgeError("");
    setCityError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setregisterError("");
    let isValid = true;

    // Validate each field and set corresponding error messages
    if (!contact.firstname) {
      setNameError("First name is required.");
      isValid = false;
    }

    if (!contact.lastname) {
      setLastNameError("Last name is required.");
      isValid = false;
    }

    if (!contact.phonenumber) {
      setMobileError("Phone number is required.");
      isValid = false;
    }

    if (!contact.age) {
      setAgeError("Age is required.");
      isValid = false;
    }

    if (!contact.city) {
      setCityError("City is required.");
      isValid = false;
    }

    if (!contact.email) {
      setEmailError("Email address is required.");
      isValid = false;
    } else if (!validateEmail(contact.email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!contact.password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(contact.password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one special character, and one number."
      );
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    } else if (contact.password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {
      const { confirmPassword, ...dataToSend } = contact; // Exclude confirmPassword from dataToSend
      axios
        .post(`${api}/register`, dataToSend)
        .then((response) => {
          console.log("Registration successful!");
          localStorage.clear(); // Clear localStorage here
          navigate("/login");
        })
        .catch((error) => {
          if (error.response) {
            const { data } = error.response;
            console.log("Backend error response:", data); // Log the backend error response
            if (data.error === "User already registered with this email") {
              console.log("Email already registered");
              setregisterError('"Email address is already registered."');
            } else if (data.error === "User already registered with this phone number") {
              console.log("Phone number already registered");
              setregisterError('"Phone number is already registered."');
            } else if (data.error === "Email and phone number already registered") {
              console.log("Email and phone number already registered");
              setregisterError('"Email and phone number are already registered."');
            } else {
              console.error("Registration failed:", error);
            }
          } else {
            console.error("Registration failed:", error);
          }
        });
    }
  }

  return (
    <section className="register">
      <div className="register-container">
        <div className="register-content">
          <h2 className="center auth-header">Create Your Account</h2>
          <p className="center auth-par">
            PLEASE ENTER YOUR INFORMATION TO SIGN UP.
          </p>
          <form onSubmit={hsn}>
            <div className="flexSb">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                id="firstname"
                value={contact.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                id="lastname"
                className="left"
                value={contact.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="flexSb">
              {nameError && (
                <span className="error-password-message">{nameError}</span>
              )}
              {lastNameError && (
                <span className="error-password-message">{lastNameError}</span>
              )}
            </div>
            <div className="flexSb">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="Phone Number"
                value={contact.phonenumber}
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                className="left"
                value={contact.city}
                onChange={handleChange}
              />
            </div>
            <div className="flexSb">
              {mobileError && (
                <span className="error-password-message">{mobileError}</span>
              )}
              {cityError && (
                <span className="error-password-message">{cityError}</span>
              )}
            </div>
            <input
              type="date"
              name="age"
              id="age"
              placeholder="Birthday"
              value={contact.age}
              onChange={handleChange}
            />
            {ageError && (
              <span className="error-password-message">{ageError}</span>
            )}
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              value={contact.email}
              onChange={handleChange}
            />
            {emailError && (
              <span className="error-password-message">{emailError}</span>
            )}
            <div className="flexSb password">
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              id="password"
              placeholder="Password"
              value={contact.password}
              onChange={handleChange}
            />
            <FontAwesomeIcon
               icon={showPassword ? faEyeSlash : faEye} 
               className="fa-eye"
               onClick={togglePasswordVisibility}
            />
            </div>
           
            {passwordError && (
              <span className="error-password-message">{passwordError}</span>
            )}
          <div className="flexSb password">
          <input
                  type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
            />
              <FontAwesomeIcon
          icon={showConfirmPassword ? faEyeSlash : faEye} // Toggle eye icon based on showConfirmPassword state
          className="fa-eye"
          onClick={toggleConfirmPasswordVisibility}
        />
          </div>
           
            {confirmPasswordError && (
              <span className="error-confirmpassword-message">
                {confirmPasswordError}
              </span>
            )}

            <div className="centering">
              <button type="submit" className="submit">
                Register
              </button>
            </div>
            <p className="parag ">
              Already a member?{" "}
              <Link to="/login" className="auth-span">
                Login
              </Link>
            </p>
            {registerError && (
              <span className="error-register-message">{registerError}</span>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
