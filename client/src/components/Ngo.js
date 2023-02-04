import React from "react";
import { useNavigate } from "react-router-dom";

function Ngo({ ngo }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/view-ngo-data/${ngo._id}`)}
    >
      <h1 className="card-title">{ngo.name}</h1>
      <hr />
      <p>
        <b>Type : </b>
        {ngo.type}
      </p>
      <p>
        <b>Phone Number : </b>
        {ngo.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {ngo.address}
      </p>
      <p>
        <b>Timings : </b>
        {ngo.timings[0]} - {ngo.timings[1]}
      </p>
    </div>
  );
}

export default Ngo;
