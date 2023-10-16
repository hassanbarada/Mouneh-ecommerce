import React, { useEffect, useState } from 'react';
import { getAllWorkshops } from './HandleApi';
import { Workshop } from './WorkshopComponent';
import './WorkshopComponent.css'

const AllWorkshops = () => {
const [workshops, setWorkshops] = useState([]);


useEffect(() => {
  getAllWorkshops(setWorkshops);
}, []);

return(

<div className="workshop-list">
{workshops.length > 0 ? (
  workshops.map((item) => (
    <Workshop
      key={item._id}
      id={item._id}
      name={item.title}
      duration={item.duration}
      price={item.price}
      description={item.description}
    />
  ))
) : (
  <p>Loading workshops...</p>
)}
</div>)
}

export default AllWorkshops;