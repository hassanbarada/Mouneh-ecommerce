import React from "react";
import {Link} from "react-router-dom";


function Product(props) {
    return (
      <>
        <div className="product">
          <div className="image">
            <img src={props.imageSrc} alt="food" />
          </div>
          <div className="namePrice">
            <h3>{props.name}</h3>
            <span>{props.price}$</span>
          </div>
          <p>{props.description}</p>
          <div className="flex">
            <div className="buy">
              Quantity: {props.quantity}
            </div>
            <div className="buy">
              {props.quantity === 0 ? (
                <p className="out-of-stock">Out of Stock</p>
              ) : (
                <button>
                  <Link to={`/product/${props._id}`}>View Product</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Product;
  