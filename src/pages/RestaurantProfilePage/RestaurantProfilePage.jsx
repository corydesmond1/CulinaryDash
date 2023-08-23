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
    <div>
      {Object.entries(businessDetails).map(([key, value]) => {
        if (typeof value != "object") {
          return (
            <div>
              {key}: {value}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default RestaurantProfilePage;
