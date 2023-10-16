import React from "react";
import axios from "axios";
import './CheckoutSuccess.css';
import payment from './img/Plain credit card.gif'


const CheckoutSuccess = () =>{

  const token=localStorage.getItem('access_token');

  axios.delete(`http://localhost:3001/cart/${localStorage.getItem('userId')}`,{
    headers: {
        token: `Bearer ${token}`,
    }
})
.then(result => {console.log(result)
})
.catch(error => console.log(error));

 return(
    <>
    <div className="payment-content">
      
         <img src={payment} alt="money"/>
      
      <div className="payment-text">
         <h1>Payment Successful !</h1>
         <h2>Thank you for your order !</h2>
         <p>Our estimated delivery time is within two days,
          If you have any questions or need assistance, please don't hesitate to contact us.  
          </p>
      </div>
    
    </div>
     
    </>
 )

}

export default CheckoutSuccess;