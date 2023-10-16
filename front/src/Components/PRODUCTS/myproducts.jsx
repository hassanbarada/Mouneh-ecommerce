import React from "react";
import {Link} from "react-router-dom";


function MyProduct(props) {
  const getStatusColor = () => {
    if (props.status === "accepted") {
      return "green";
    } else if (props.status === "waiting") {
      return "red";
    } else {
      return "default";
    }
  };

  const statusColor = getStatusColor();
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
          <p>Status: <span style={{ color: statusColor }}>{props.status}</span></p>
         
          <div className="flex">
          <div className="buy">
              Quantity: {props.quantity}
            </div>
          <div className="buy">
          <button>
                  <Link to={`/updateproduct/${props._id}?category=${props.category}`}>update</Link>
                </button>
                </div>
           
          </div>
        </div>
      </>
    );
  }
  
  export default MyProduct;
  