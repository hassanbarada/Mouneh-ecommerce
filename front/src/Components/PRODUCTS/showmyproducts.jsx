import React, { useState, useEffect } from "react";
import axios from "axios";
import MyProduct from "./myproducts";
import Search from "./Searchbar";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

import "./allProducts.css";

function MyProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const token = localStorage.getItem('access_token');
  useEffect(() => {
    axios.get(`http://localhost:3001/products/my-products/${localStorage.getItem('userId')}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    })
    .then(result => {
      setProducts(result.data);
    })
    .catch(error => {
      console.error(error);
      if (error.response && error.response.status === 403) {
        navigate('/login');
      }
    });
  }, [token]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredProducts.slice(firstPostIndex, lastPostIndex);

  const shouldDisplaySearch = filteredProducts.length > 0 || searchQuery.trim() !== '';
  const noProductMessage = searchQuery.trim() !== '' ? "No product found with this name" : "No product yet";
  const noProduct = () => {
    navigate('/addProduct');
  }

  return (
    <>
      <div className="products-container">
        {shouldDisplaySearch && ( // Conditionally render if there are products or valid search query
          <div className="products-header">
            <Search setSearchQuery={setSearchQuery} />
          </div>
        )}

        <div className="products">
          {currentPosts.length === 0 ? (
            <div className="no-product-yet">
              <h1>{noProductMessage}</h1>
              {searchQuery.trim() === '' && (
                <button onClick={noProduct}>Add Product</button>
              )}
            </div>
          ) : (
            currentPosts.map((item) => (
              <MyProduct
                key={item._id}
                imageSrc={`http://localhost:3001/products/${item._id}/photo`}
                {...item}
              />
            ))
          )}
        </div>
        <Pagination
          totalPosts={filteredProducts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default MyProducts;
