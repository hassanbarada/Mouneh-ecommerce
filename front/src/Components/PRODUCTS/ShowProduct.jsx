import React ,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "./products";
import Search from "./Searchbar";
import Pagination from "./Pagination";

import "./allProducts.css";



function ShowProducts(){
const [products,setProducts]=useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(8);
const params = useParams();
const Category = params.Category;

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${Category}`)
      .then(result => {
        setProducts(result.data);
        console.log(result.data);
      })
      .catch(error => console.error(error));
  }, [Category]);
  

const filteredProducts = products.filter((product) =>
product.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = filteredProducts.slice(firstPostIndex, lastPostIndex);




    return(
        <>
    <div className="products-container">
        <div className="products-header">
          <h1>Products</h1>
           <Search setSearchQuery={setSearchQuery}/>
        </div>   
           
        <div className="products">
        {currentPosts.map((item) => (
            <Product key={item._id} imageSrc={`http://localhost:3001/products/${item._id}/photo`} {...item}/>
          ))}
          
        </div>
        <Pagination
        totalPosts={filteredProducts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        />

    </div>
    
   
   
      </>
    )
}
export default ShowProducts;