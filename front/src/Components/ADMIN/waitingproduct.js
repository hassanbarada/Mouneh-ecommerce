import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import './Admin.css';

const Products = () => {
  const [waitingProducts, setWaitingProducts] = useState([]);

  const getWaitingProducts = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        token: `Bearer ${token}`,
      };

      const { data } = await axios.get("http://localhost:3001/waitingproduct", { headers });
      setWaitingProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching waiting products");
    }
  };

  useEffect(() => {
    getWaitingProducts();
  }, []);

  const handleUpdateStatus = async (productId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        token: `Bearer ${token}`,
      };

      const response = await axios.put(`http://localhost:3001/updateProductStatus/${productId}`, null, { headers });

      if (response.status === 200) {
        setWaitingProducts((prevProducts) =>
          prevProducts.map((p) => (p._id === productId ? { ...p, status: 'accepted' } : p))
        );
        toast.success("Product status updated to accepted!");
      } else {
        toast.error("Failed to update product status.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating product status");
    }
  };

  const handleDeleteProduct = async (userId, productId) => {
    try {
      const token = localStorage.getItem('access_token');
  
      // Set the token in the request headers
      const headers = {
        token: `Bearer ${token}`,
      };
  
      // Send a DELETE request to your backend API to delete the product
      await axios.delete(`http://localhost:3001/products/${userId}/${productId}`, { headers });
  
      // If the deletion is successful, remove the deleted product from the state
      setWaitingProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));
  
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the product");
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
          <h1 className="waitinglist text-center">Waiting Products</h1>
          <div className="product-list">
            {waitingProducts.length === 0 ? (
              <p className="no-products-message">No Waiting Products To Show....</p>
            ) : (
              waitingProducts.map((p) => (
                <div className="product-item m-4 d-flex" style={{ width: "80%" }}>
                <div className="product-image-container " style={{ width: "25%" }}>
                  <img
                    src={`http://localhost:3001/products/${p._id}/photo`}
                    className="product-image w-100 h-auto"
                    alt={p.name}
                  />
                </div>
                <div className="product-info-container ml-4" style={{ width: "50%" }}>
                  <h5 className="product-title">{p.name}</h5>
                  <div className="product-info-row">
                    <p className="product-label">
                      Seller:{" "}
                      <span className="product-data">
                        {p.userID.firstname} {p.userID.lastname}
                      </span>
                    </p>
                    <p className="product-label">
                      Category: <span className="product-data">{p.category}</span>
                    </p>
                  </div>
                  <div className="product-info-row">
                    <p className="product-label">
                      Price: <span className="product-data">{p.price} $</span>
                    </p>
                    <p className="product-label">
                      Quantity: <span className="product-data">{p.quantity}</span>
                    </p>
                  </div>
                  <div className="product-info-row">
                    <p className="product-label">
                      Description:{" "}
                      <span className="product-data">{p.description}</span>
                    </p>
                    {/* Render additional fields for 'food' category */}
                    {p.category === 'Food' && p.recipes && (
                      <div className="food-info">
                        <p className="product-label">Weight: <span className="product-data">{p.recipes.weight}</span></p>
                        <p className="product-label">Time: <span className="product-data">{p.recipes.time}</span></p>
                      </div>
                    )}
                  </div>
                  {/* Render additional fields for 'food' category */}
                  {p.category === 'Food' && p.recipes && (
                    <div className="product-info-row">
                      <p className="product-label">Ingredient: <span className="product-data">{p.recipes.ingredient}</span></p>
                    </div>
                  )}
                  <div className="product-info-row">
                    {/* Render additional fields for 'food' category */}
                    {p.category === 'Food' && p.recipes && (
                      <div className="product-info-row">
                        <p className="product-label">Method: <span className="product-data">{p.recipes.method}</span></p>
                      </div>
                    )}
                  </div>
                  <div className="product-buttons d-flex justify-content-between">
                    {p.status !== "accepted" && (
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdateStatus(p._id)}
                      >
                        Accept
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(p.userID, p._id)}
                    >
                      Delete
                    </button>
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
};

  
  
                    
            
export default Products;