import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import './Admin.css';

import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { userId } = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imagePath, setImage] = useState(null);
  const [id, setId] = useState("");
  const [weight, setWeight] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [time, setTime] = useState("");
  const [method, setMethod] = useState("");


 
  console.log("Product id:", productId);
  console.log("user id:", userId);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/products/find/${productId}`
      );
      console.log("Product data:", data);
      setName(data.name);
      setId(data._id);
      setDescription(data.description);
      setPrice(data.price);
      setQuantity(data.quantity);
      setCategory(data.category);
      // Fetch the category data
        
      if (data.category === "Food" && data.recipes) {
        setWeight(data.recipes.weight);
        setIngredient(data.recipes.ingredient);
        setTime(data.recipes.time);
        setMethod(data.recipes.method);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getSingleProduct();
  }, []);

  // get all category
  /*const getAllCategory = async () => {
    //try {
     // const { data } = await axios.get("http://localhost:3000/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);*/

  // create product function
  const fetchProductImage = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${productId}/photo`, {
        responseType: 'blob', // Indicate that the response is binary data (image)
      });
  
      // Create a new Blob object with the retrieved image data
      const imageBlob = new Blob([response.data]);
  
      // Create an object URL for the Blob
      const imageUrl = URL.createObjectURL(imageBlob);
  
      // Set the image URL as the imagePath state
      setImage(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUpdate = async () => {
   
   
    try {
      
      console.log("Form submitted. Starting product creation...");
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
  
      // Additional check for 'Food' category before adding recipe data
      if (category === "Food") {
        productData.append("weight", weight);
        productData.append("ingredient", ingredient); // Corrected key here
        productData.append("time", time); // Corrected key here
        productData.append("method", method); // Co
      }
      if (imagePath) {
        productData.append("imagePath", imagePath);
      }
      const token = localStorage.getItem('access_token');
      
      // Set the token in the request headers
      const headers = {
        token: `Bearer ${token}`,
      };
      console.log("imagePath:", imagePath);
      const { data } = await axios.put(
        `http://localhost:3001/products/${userId}/${productId}`,
        productData,
        { headers }
      );
      fetchProductImage(productId);
      console.log("Product Data:", productData);
      console.log("new data",data);
      if (data?.success) {
        toast.success("Product updated successfully!");
      } else {
        toast.success("Product updated successfully!");
      }
    } catch (error) {
      console.log("the error is " ,error);
      toast.error("Something went wrong while updating the product");
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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="dashupdate col-md-3">
            <AdminMenu />
          </div>
          <div className="containerupdate col-md-9">
            <h1 className="headerupdate">Update Product</h1>
            <div className="m-1 w-100 d-flex">
              <div className="mb-3">
                <label className="btnupdate btn-outline-secondary col-md-3">
                  {imagePath ? imagePath.name : "Upload Photo"}
                  <input
                    type="file"
                    name="imagePath"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {imagePath ? (
                  <div className="text-center-img">
                    <img
                      src={imagePath}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center-img">
                    <img
                      src={`http://localhost:3001/products/${productId}/photo`}
                      alt="product_photo"
                      height={"200px"}
                      className="imgupdate img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="row mb-3">
              <div className="details-container">
              <div className="details-section">
                <div className="inputupdate col-md-6">
                  <label>Category:</label>
                  <input
                    type="text"
                    value={category}
                    placeholder="Category"
                    className="form-control"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="inputupdate col-md-6">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
               
               <div className="inputupdate col-md-6">
                <label>Description:</label>
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
               </div>
               </div>
               <div className="details-section">
               <div className="inputupdate col-md-6">
                  <label>Price/$:</label>
                  <input
                    type="number"
                    value={price}
                    placeholder="Write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="inputupdate col-md-6">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                </div>
             
              {category === "Food" && (
                <div className="details-section">
                
                  <div className="row mb-3">
                    <div className="inputupdate col-md-6">
                      <label>Weight/KG:</label>
                      <input
                        type="number"
                        value={weight}
                        placeholder="Weight"
                        className="form-control"
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    <div className="inputupdate col-md-6">
                      <label>Time/minutes:</label>
                      <input
                        type="number"
                        value={time}
                        placeholder="Time"
                        className="form-control"
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="inputupdate col-md-6">
                      <label>Ingredient:</label>
                      <input
                        type="text"
                        value={ingredient}
                        placeholder="Ingredient"
                        className="form-control"
                        onChange={(e) => setIngredient(e.target.value)}
                      />
                    </div>
                    <div className="inputupdate col-md-6">
                      <label>Method:</label>
                      <input
                        type="text"
                        value={method}
                        placeholder="Method"
                        className="form-control"
                        onChange={(e) => setMethod(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              </div>
             
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
       
           
      </>
  );
};

export default UpdateProduct;
