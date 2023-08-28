import React from "react";
import "./BusinessDetail.css";

const BusinessDetail = ({ businessDetails }) => {
  return (
    <div className="business-details">
      <img
        className="profile-image"
        src={businessDetails.image_url}
        alt={businessDetails.name}
      />
      <div className="restaurant-name">{businessDetails.name}</div>
      <div className="details">
        <span>{businessDetails.rating}</span>
        <span>{businessDetails.price}</span>
        <span>{businessDetails.display_phone}</span>
       </div>
    </div>
  );
};

export default BusinessDetail;
