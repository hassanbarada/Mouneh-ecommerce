// import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';
// import Link from '@hapi/joi/lib/types/link'
import RegisterButton from '../WORKSHOPREGISTER/RegisterButton'
import './WorkshopDetails.css'
import { Link } from 'react-router-dom'


export function WorkshopDetails(props) {
  return (
    <div key={props.id} className="workshopDetails-Card bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4">
      <img
        src="https://i.pinimg.com/564x/65/1c/aa/651caa3ca768935868888cad763c4a52.jpg"
        alt='workshop-img'
        className="w-28 h-28 rounded-full mx-auto"
      />

      <div className="flex-grow">
        <h1 className="text-2xl text-yellow-600 font-semibold">{props.name}</h1>
        <div className="text-amber-900 mt-2">{props.description}</div>
        <div className="text-sm text-gray-500 mt-1">Duration: {props.duration} hrs</div>
        <div className="text-sm text-gray-500">Capacity: {props.capacity} places left</div>
        <div className="text-sm text-gray-500">Price: {props.price} $</div>

        {props.capacity < 1 ? (
          <p className="text-red-600 mt-2">Workshop Not Available</p>
        ) : (
          // <p className="text-green-600 mt-2">Available</p>
          console.log("Available")
        )}
      </div>
    </div>



  )
}