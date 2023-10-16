import { Link } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// import './WorkshopComponent.css';

export function Workshop(props) {


  return (
    <div className="border rounded-lg shadow-md p-4 text-brown-600">
      <div className="flex items-center space-x-4">
        <img
          src="https://i.pinimg.com/564x/65/1c/aa/651caa3ca768935868888cad763c4a52.jpg"
          alt="workshop-img"
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-grow">
          <h2 className="text-yellow-600 text-lg font-semibold">{props.name}</h2>
          <div className="text-yellow-600">{props.description}</div>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1 text-sm">

              <span className="text-amber-900" >   <FontAwesomeIcon icon={faClock} />{props.duration} hrs</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">

              <span className="text-amber-900" >${props.price}</span>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <button className="px-4 py-2 text-white bg-yellow-500  rounded-md">
            <Link
              to={`/workshop/${props.id}`}
              className="text-white"
            >
              View

            </Link>
          </button>
        </div>
      </div>
    </div>

  );
}
