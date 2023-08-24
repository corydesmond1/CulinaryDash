import React, { useEffect, useState } from "react";
import { yelpBusinessDetail } from "../../utilities/yelp-api";
import "./RestaurantProfilePage.css";
import { useParams } from "react-router-dom";

const RestaurantProfilePage = () => {
  const { id } = useParams();
  const [businessDetails, setBusinessDetails] = useState("");

  useEffect(() => {
    if (!id) return;
    yelpBusinessDetail(id)
      .then((res) => setBusinessDetails(res))
      .catch((e) => console.error(e));
  }, [id]);

  return (
    <div className="profile-container">
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
      <span style={{ color: 'blue'}}><h2>MENU GOES DOWN HERE</h2></span>
    </div>
  );
};

export default RestaurantProfilePage;
