import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();  
  return (
    <div className="card m-2 ">
      <div className="card-body">
        <h5 className="card-title text-uppercase text-2x">{bus.busName}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">From : {bus.from}</li>
        <li className="list-group-item">To: {bus.to}</li>
        <li className="list-group-item">Price: {bus.price}</li>
        <li className="list-group-item">Date: {bus.date}</li>
        <li className="list-group-item">Arrival: {bus.arrival}</li>
        <li className="list-group-item">Departure: {bus.departure}</li>
        <li className="list-group-item">Type: {bus.type}</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link text-2x" onClick={()=>{
            navigate(`/book/${bus._id}`);
        }}>
          Book Now
        </a>
      </div>
    </div>
  );
}

export default Bus;
