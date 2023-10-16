import React from "react";
import axios from "axios"; 


const PayButton = ({cartItems}) =>{

    const userID=localStorage.getItem('userId');
    console.log(userID);
   

    const handlecheckout = () =>{
        cartItems.map(item => {
            console.log(item.productID._id);
          });
        console.log("Cart Items:", cartItems);
        axios
        .post(`http://localhost:3001/create-checkout-session`, {
          cartItems,
          userID,       
        })
        .then((response) => {
          if (response.data.url) {
            window.location.href = response.data.url;
          }
        })
        .catch((err) => console.log("Stripe Checkout Error:" +err.message));
    }
    
 return(
    <>
      <button onClick={()=>handlecheckout()} className="checkout">Check out</button>
    </>
 )

}

export default PayButton;