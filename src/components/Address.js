import React from 'react';
import "../styles/Address.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Address = ({ data }) => {
    const handleAddUpdateAddress =()=>{

    };
  return (
    <div className="address-component">
        <div className='address mktemp'>
            <h3 onClick={handleAddUpdateAddress} style={{textAlign:'center'}}> <FontAwesomeIcon icon={faPlus} style={{fontSize:30, opacity:'0.7'}}/> <br/>Address </h3>
        </div>
      {data.map((address, index) => (
        <div className="address" key={index}>
          <div className="address-info">
            <p><b>Name:</b> {address.name}</p>
            <p><b>Address 1:</b> {address.address1}</p>
            <p><b>Address 2:</b> {address.address2}</p>
            <p>
              <b>City & State & PIN:</b> {address.city}, {address.state} {address.zip}
            </p>
            <p><b>Phone:</b> {address.phone}</p>
            <p><b>Email:</b> {address.email}</p>
          </div>
          <div className="actions">
            <button className="edit-btn">Edit</button>
            <button className="remove-btn">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Address;
