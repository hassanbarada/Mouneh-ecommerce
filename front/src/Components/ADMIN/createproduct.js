import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import './Admin.css';
import { useNavigate } from "react-router-dom";
import productImage from '../../images/Bath bomb.gif';



/*import { useNavigate } from "react-router-dom";*/

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [category, setCategory] = useState("");
 const [categoryError, setCategoryError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");
  const [imagePath, setImage] = useState(null);
  const [ingredient, setIngredient] = useState("");
  const [time, setTime] = useState("");
  const [method, setMethod] = useState("");

  const navigate = useNavigate();


  const handleCreate = async (e) => {
    e.preventDefault();
   
    // Reset all the previous error messages
    setNameError("");
    setDescriptionError("");
    setPriceError("");
    setCategoryError("");
    setQuantityError("");
    setWeightError("");
  
    // Validate the input fields
    if (!name) {
      setNameError("Product name is required.");
      return;
    }
    if (!description) {
      setDescriptionError("Product description is required.");
      return;
    }
    if (!price) {
      setPriceError("Product price is required.");
      return;
    }
    if (!category) {
      setCategoryError("Product category is required.");
      return;
    }
    if (!quantity) {
      setQuantityError("Product quantity is required.");
      return;
    }
    
  
    try {
      console.log("Form submitted. Starting product creation...");
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("imagePath", imagePath);
      productData.append("category", category);
  
      // Additional check for 'Food' category before adding recipe data
      if (category === "Food") {
        if (!weight) {
          setWeightError("Product weight is required.");
          return;
        }
        productData.append("weight", weight);
        productData.append("ingredient", ingredient); // Corrected key here
        productData.append("time", time); // Corrected key here
        productData.append("method", method); // Corrected key here
      }
      const token = localStorage.getItem('access_token');

      // Set the token in the request headers
      const headers = {
        token: `Bearer ${token}`,
      };

      const { data } = await axios.post(
        "http://localhost:3001/products",
        productData,
        { headers }
      );
      console.log("Product creation response:", data);
      if (data?.success) {
        toast.success("Product created successfully!");
      } else {
        toast.success("Product created successfully!");
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong to add product");
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
            <div className="create-product-container">
            <h1 className="titleadmin">Create Product</h1>
            <div className="d-flex">
              <div className="cont m-1 w-75">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label>Product Name:</label>
                      <input
                        type="text"
                        value={name}
                        placeholder="Write a name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                      {nameError && (
                        <span className="error-message">{nameError}</span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label>Upload Image:</label>
                      <label className="btnu btn-outline-secondary col-md-12">
                        {imagePath ? imagePath.name : "Upload Photo"}
                        <input
                          type="file"
                          name="imagePath"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          hidden
                        />
                      </label>
                      {imagePath && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(imagePath)}
                            alt="product_imagePath"
                            height={"100px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label>Category:</label>
                      <div className="product-category" style={{ display: "flex", marginBottom: "10px" }}>
                      <label className="radiocategory">
                                <input
                                    type="radio"
                                    name="category"
                                    value="Food"
                                    checked={category === 'Food'}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                Food
                            </label>
                            <label className="radiocategory">
                                <input
                                    type="radio"
                                    name="category"
                                    value="Craft"
                                    checked={category === 'Craft'}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                Craft
                            </label>
                          
                      </div>
                    </div>
                    <div className="mb-3">
                      <label>Product Description:</label>
                      <textarea
                        type="text"
                        value={description}
                        placeholder="Write a description"
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      {descriptionError && (
                        <span className="error-message">{descriptionError}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {category === "Food" && (
                      <div>
                        <div className="mb-3">
                          <label>Weight/g:</label>
                          <input
                            type="number"
                            value={weight}
                            placeholder="Weight"
                            className="form-control"
                            onChange={(e) => setWeight(e.target.value)}
                          />
                          {weightError && (
                            <span className="error-message">{weightError}</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <label>Time/Minutes:</label>
                          <input
                            type="number"
                            value={time}
                            placeholder="Time"
                            className="form-control"
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label>Ingredient:</label>
                          <textarea
                            type="text"
                            value={ingredient}
                            placeholder="Ingredient"
                            className="form-control"
                            onChange={(e) => setIngredient(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label>Method:</label>
                          <textarea 
                            type="text"
                            value={method}
                            placeholder="Method"
                            className="form-control"
                            onChange={(e) => setMethod(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    <div className="mb-3">
                      <label>Product Price/$:</label>
                      <input
                        type="number"
                        value={price}
                        placeholder="Write a Price"
                        className="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      {priceError && (
                        <span className="error-message">{priceError}</span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label>Product Quantity:</label>
                      <input
                        type="number"
                        value={quantity}
                        placeholder="Write a quantity"
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      {quantityError && (
                        <span className="error-message">{quantityError}</span>
                      )}
                    </div>
                    <div className="mb-3 text-end">
                    <button
                      className="btn btn-primary"
                      onClick={handleCreate}
                    >
                      CREATE PRODUCT
                    </button>
                  </div>
                  </div>
                </div>
              </div>
              <div className="product-image-container">
            <img
              src={productImage} 
              alt="Product Image"
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
export default CreateProduct;
