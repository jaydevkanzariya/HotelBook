import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../Helper";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteHotelMutation,
  useGetHotelsQuery,
  useGetHotelByIdQuery,
} from "../Apis/hotelApi";
import { useGetHotelXAmentiyByHotelIdQuery } from "../Apis/hotelXAmenityApi";
import { useGetHotelXPolicyByHotelIdQuery } from "../Apis/hotelXPolicyApi";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { MainLoader } from "../Componets/Page/Common";
import {
  hotelModel,
  hotelXAmenityModel,
  hotelXPolicyModel,
} from "../Interfaces";
import { json } from "stream/consumers";

function Details() {
  debugger;
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: hotelData } = useGetHotelByIdQuery(id);
  const { data: hotelXAmentiy } = useGetHotelXAmentiyByHotelIdQuery(id);
  const { data: hotelXPolicy } = useGetHotelXPolicyByHotelIdQuery(id);
  const [showFullDescription, setShowFullDescription] = useState(false);

  function toggleDescription() {
    setShowFullDescription((prev) => !prev);
  }

  return (
    <>
      <div className="hoteld shadow border-0 mt-4 mb-4">
        <div className="hoteld-header bg-secondary bg-gradient text-light py-4">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="text-white text-uppercase">
                {hotelData?.result.name}
              </h3>
            </div>
          </div>
        </div>
        <div className=" d-flex justify-content-end">
          <a
            onClick={() => navigate("/Home")}
            className="btn btn-secondary mt-3"
          >
            Back to Home
          </a>
        </div>
        <div className="hoteld-body  px-3">
          <div className="py-3">
            <div className="row">
              <div className="col-12 col-lg-4 text-center mb-3"></div>
              <div className="col-12 col-lg-6  offset-lg-1">
                <div className="col-12 col-md-6 pb-4">
                  <span className="badge">{hotelData?.result.name}</span>
                </div>
                <div className="">
                  <span className="text-dark text-opacity-50">
                    City Name :-
                  </span>
                  <span className="text-dark">
                    {hotelData?.result.city.cityName}
                  </span>
                </div>
                <div className="">
                  <span className="text-dark text-opacity-50">
                    startingPrice :-
                  </span>
                  <span className="text-dark">
                    {hotelData?.result.startingPrice}
                  </span>
                </div>

                <div className="pb-2">
                  <span className="text-dark text-opacity-50 fw-bold">
                    Details :-
                  </span>
                  <span className="" id="ReadMore">
                    {showFullDescription
                      ? hotelData?.result.details
                      : hotelData?.result.details.substring(0, 10)}
                  </span>
                  <span className="" id="ReadLess">
                    {hotelData?.result.details}
                  </span>
                  <span id="dots">...</span>{" "}
                  <a className="" onClick={toggleDescription} id="myBtn">
                    {showFullDescription ? "Read less" : "Read more"}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" text-dark text-uppercase">
              <h4>{hotelData?.result.name} Hotel Amenity</h4>
            </div>
          </div>
          {hotelXAmentiy?.result?.map((Amenity: hotelXAmenityModel) => {
            return (
              <div className="row border" key={Amenity.id}>
                <div className="col-2">{Amenity.amenity?.amenityName}</div>
              </div>
            );
          })}
          <div className="">
            <div className=" text-dark text-uppercase">
              <h4>{hotelData?.result.name} Hotel Policy</h4>
            </div>
          </div>
          {hotelXPolicy?.result?.map((Policy: hotelXPolicyModel) => {
            return (
              <div className="row border" key={Policy.id}>
                <div className="col-2">{Policy.policy?.addPolicy}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Details;
