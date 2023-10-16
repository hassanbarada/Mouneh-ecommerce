import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import "./Cart.css";
import PayButton from "./Paybutton";

const Cart = () => {
    const [cartItems,setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    

    useEffect(() => {
      if (!token) {
        navigate('/login');
        return;
      }
        axios.get('http://localhost:3001/cart', {
            headers: {
                token: `Bearer ${token}`,
            }
        })
        .then(result => {
            setCartItems(result.data);
            const sum = result.data.reduce((total, item) => total + (item.quantity * item.productID.price), 0);
            setSubtotal(sum);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            console.log("Token is not valid!");
            navigate('/login');
          } else {
            console.error("Cart Add failed:", error);
          }
        });
    }, [token]);
    
        const continueShopping = () => {
            navigate('/showProducts/All');
        }

        const handleDelete = (e, cartID, productID, quantity) => {
            e.preventDefault();
            
            axios.delete(`http://localhost:3001/cart/${localStorage.getItem('userId')}/${cartID}`, {
              headers: {
                token: `Bearer ${token}`,
              },
            })
            .then(result => {
              console.log(result);
              
              axios.patch(`http://localhost:3001/return-quantity/${productID}`, { quantity }, {
                headers: {
                  token: `Bearer ${token}`,
                },
              })
              .then(updateResult => {
                console.log(updateResult);
                window.location.reload(); 
              })
              .catch((error) => {
                if (error.response && error.response.status === 403) {
                  console.log("Token is not valid!");
                  navigate('/login');
                } else {
                  console.error("Cart Add failed:", error);
                }
              });
            })
            .catch((error) => {
              if (error.response && error.response.status === 403) {
                console.log("Token is not valid!");
                navigate('/login');
              } else {
                console.error("Cart Add failed:", error);
              }
            });
          };

          const handleDeleteAllCartItems = (e) => {
            e.preventDefault();
          
            cartItems.forEach(item => {
              const { _id: cartID, productID, quantity } = item;
          
              axios.patch(`http://localhost:3001/return-quantity/${productID._id}`, { quantity }, {
                headers: {
                  token: `Bearer ${token}`,
                },
              })
              .then(updateResult => {
                console.log(updateResult);
              })
              .catch((error) => {
                if (error.response && error.response.status === 403) {
                  console.log("Token is not valid!");
                  navigate('/login');
                } else {
                  console.error("Cart Add failed:", error);
                }
              });
            });
          
            axios.delete(`http://localhost:3001/cart/${localStorage.getItem('userId')}`, {
              headers: {
                token: `Bearer ${token}`,
              },
            })
            .then(result => {
              console.log(result);
              window.location.reload();
            })
            .catch((error) => {
              if (error.response && error.response.status === 403) {
                console.log("Token is not valid!");
                navigate('/login');
              } else {
                console.error("Cart Add failed:", error);
              }
            });
          };
          
      

    
    return (
        <>
        <h1 className="add-to-cart-container-header">Shopping Cart</h1>
        <div className="add-to-cart-container">
            <table>
                <thead>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                </thead>
                <tbody>
  {cartItems.map(item => (
    <tr key={item._id}>
      <td>
        <div className="add-to-cart-container-product">
          <img src={`http://localhost:3001/products/${item.productID._id}/photo`} alt={`${item._id}`} />
          <div className="add-to-cart-container-product-right">
            <h3>{item.productID.name}</h3>
            <p>{item.productID.description}</p>
            <button className="remove" onClick={(e) => handleDelete(e, item._id, item.productID._id, item.quantity)}>
              Remove
            </button>
          </div>
        </div>
      </td>
      <td> {item.productID.price}$</td>
      <td>{item.quantity}</td>
      <td>{item.productID.price * item.quantity}$</td>
    </tr>
  ))}
</tbody>
            </table>
        </div>
        <div className="add-to-cart-container-checkout">
                <button className="clear-cart" onClick={(e) => handleDeleteAllCartItems(e)}>Clear Cart</button>
                <div className="add-to-cart-container-checkout-right">
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:"x-large"}}>
                        <h1>Subtotal</h1>
                        <h3 style={{fontWeight:'bold'}}>${subtotal}</h3>
                    </div>
                    <p>Taxes and shipping calculated at checkout</p>
                    <PayButton cartItems={cartItems}/>
                    
                    <button onClick={continueShopping} className="continue-shopping">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Continue Shopping</button>
                </div>
            </div>
        </>
    )
}

export default Cart;