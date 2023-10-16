import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import './Admin.css';
import { useNavigate } from "react-router-dom";


const Products = () => {
  const [products, setProducts] = useState([]);
const navigate = useNavigate();
  // get all products
  const getAllProducts = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        token: `Bearer ${token}`,
      };

      const { data } = await axios.get(`http://localhost:3001/products/my-products/${localStorage.getItem('userId')}`, { headers });
      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong getting product");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDeleteProduct = async (userId, productId) => {
    console.log("userId:", userId);
    console.log("productId:", productId);
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        token: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:3001/products/${userId}/${productId}`, { headers });

      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong delete product");
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
      <div className="row dashboard">
      <div className="dash col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="productlist text-center">My Products </h1>
          <div className=" cardlist d-flex flex-wrap w-100 h-200">
            {products.map((p) => (
              <div key={p._id} className=" cardproduct cardadmin m-4" style={{ width: "250px" ,height:"400px"}}>
                <img
                  src={`http://localhost:3001/products/${p._id}/photo`}
                  className="card-img-top product-image w-250 h-50"
                  alt={p.name}
                />
                <div className="card-body">
                <h5 className="card-title1">Name: {p.name}</h5>
                  <h5 className="card-text1">Category: {p.category}</h5>
                  <h5 className="card-text1">Price :  {p.price} $</h5>
                  
                  <div className="cardbtn d-flex justify-content-between">
                    <Link
                      to={`/dashboard/admin/product/update/${p.userID}/${ p._id}`}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(p.userID, p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
  );
};
export default Products;