import React,{useState} from "react";
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Contact.css'
import treeImage from '../../images/cherry tree.gif'

const Contact = () => {
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [subject,setSubject] = useState('');
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('');

    const notify = () => toast.success('Email Sended', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

      const handleSubmit = (e) => {
        e.preventDefault();
    
        axios
          .post("http://localhost:3001/sendEmail", {firstname,lastname,subject,email,message})
          .then((response) => {
            console.log("Email sent successfully:", response.data);
            notify();
            //window.location.reload();
          })
          .catch((error) => {
            console.error("Error sending email:", error);
            
          });
      };

    return (
        <div className="contact-container">
          <ToastContainer
          position="top-center"
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
            <div className="contact-container-left">
                <img src={treeImage} alt="" />
            </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-top">
                    <div className="form-section">
                    <label htmlFor="">First Name</label><br />
                    <input type="text" name="" id="" onChange={(e)=>{setFirstname(e.target.value)}} required/>
                    </div>
                    <div className="form-section">
                    <label htmlFor="">Last Name</label><br />
                    <input type="text" name="" id="" onChange={(e)=>{setLastname(e.target.value)}} required/>
                    </div>
                    </div>
                    <div className="form-section">
                    <label htmlFor="">Subject</label><br />
                    <input type="text" name="" id="" onChange={(e)=>{setSubject(e.target.value)}} required/>
                    </div>
                    <div className="form-section">
                    <label htmlFor="">Email</label><br />
                    <input type="email" name="" id="" onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div><br />
                    <div className="form-section">
                    <label htmlFor="">Your Message</label><br />
                    <textarea
                    name="message"
                    id="message"
                    rows="8" 
                    cols="50"
                    placeholder="Type your message here..."
                    onChange={(e)=>{setMessage(e.target.value)}}
                    required
                    ></textarea>
                    </div>
                    <div className="button-container">
                    <button type="submit">Submit</button>
                    </div>
                </form>
            
        </div>
    )
} 

export default Contact;