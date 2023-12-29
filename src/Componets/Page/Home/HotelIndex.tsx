import React from "react";
import { apiResponse, hotelModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  hotel: hotelModel;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function HotelIndex(props: Props) {
  const navigate = useNavigate();
  // const userData: userModel = useSelector(
  //   (state: RootState) => state.userAuthStore
  // );

  return (
    <div className="col-lg-3 col-sm-6">
      <Link to={`/details/${props.hotel.id}`} className="text-decoration-none text-black">
        <div className="row p-2"> 
          <div className="col-12 p-1">
            <h5 className="fw-bold text-center  text-uppercase">
              {/* @TruncateText(Hotel.HotelName, 20) */}
              {/* {props.hotel.hotelName.substring(0,22)} */}
              {truncateText(props.hotel.name, 20)}
            </h5>

            <a>
              {/* @if (Hotel.HotelLogo != null && Hotel.HotelLogo.Count() > 0)
                    {
                        <img src="@Hotel.HotelLogo" alt="@Hotel.HotelName" height="300px" width="400px" className="card-img-top rounded" />
                    }
                    else
                    { */}
              <img
                src="https://placehold.co/300x400/png"
                height="300px"
                width="400px"
                className="card-img-top rounded"
              />
              {/* } */}
            </a>

            <div className="card-body p-1">
              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">Address:-</span>
                {/* @Hotel.Address.Substring(0, Math.Min(20, Hotel.Address.Length))... */}
                {props.hotel.city?.cityName}
              </div>

              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">checkInTime:-</span>
                {props.hotel.checkInTime}
              </div>

              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">checkOutTime:-</span>
                {props.hotel.checkOutTime}
              </div>

              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">MobileNumber:-</span>
               {props.hotel.mobileNumber}
              </div>

              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">StartingPrice:-</span>
               {props.hotel.startingPrice}
              </div>
            </div>

           

            {/* @*   <div>
            <a asp-action="BrifDetail" asp-controller="Home" asp-area="Customer" asp-route-hotelId="@Hotel.Id" className="btn btn-primary bg-gradient border-0 form-control">
            Details
            </a>
            </div> *@ */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelIndex;
