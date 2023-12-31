import React, { useEffect, useState } from "react";
import {
  useCreateHotelMutation,
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
} from "../../Apis/hotelApi";
import { cityModel, countryModel, stateModel } from "../../Interfaces";
import { useGetAllStatesQuery } from "../../Apis/stateApi";
import { useGetAllCountrysQuery } from "../../Apis/countryApi";
import { useGetAllCitysQuery } from "../../Apis/cityApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common";
import { apiResponse } from "../../Interfaces";

const hotelData: {
  name: string;
  details: string;
  startingPrice: number;
  checkInTime: string;
  checkOutTime: string;
  countryId?: number;
  cityId?: number;
  stateId?: number;
  isActive?: boolean;
  mobileNumber: number;
  address: string;
  imageURL: string;
} = {
  name: "",
  details: "",
  startingPrice: 0,
  checkInTime: "",
  checkOutTime: "",
  countryId: undefined,
  cityId: undefined,
  stateId: undefined,
  isActive: false,
  mobileNumber: 0,
  address: "",
  imageURL: "",
};

function HotelUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotelInputs, setHotelInputs] = useState(hotelData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createHotel] = useCreateHotelMutation();
  const [updateHotel] = useUpdateHotelMutation();
  const { data } = useGetHotelByIdQuery(id);
  const { data: statesData } = useGetAllStatesQuery(null);
  const { data: countrysData } = useGetAllCountrysQuery(null);
  const { data: citysData } = useGetAllCitysQuery(null);
  const [selectedCountry, setSelectedCountry] = useState<number | undefined>(
    hotelInputs.countryId
  );
  const [selectedState, setSelectedState] = useState<number | undefined>(
    hotelInputs.stateId
  );
  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        details: data.result.details,
        startingPrice: data.result.startingPrice,
        checkInTime: data.result.checkInTime,
        checkOutTime: data.result.checkOutTime,
        countryId: data.result.countryId,
        cityId: data.result.cityId,
        stateId: data.result.stateId,
        isActive: data.result.isActive,
        mobileNumber: data.result.mobileNumber,
        address: data.result.address,
        imageURL: data.result.imageURL,
      };
      setHotelInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update countryInputs with the new value of isActive
    setHotelInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };
  // const getCurrentDate = () => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, '0');
  //   const day = String(today.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  const handleHotelInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, hotelInputs);
    setHotelInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("Name", hotelInputs.name);
    formData.append("Details", hotelInputs.details || "");
    formData.append("StartingPrice", hotelInputs.startingPrice.toString());
    formData.append("CheckInTime", hotelInputs.checkInTime);
    formData.append("MobileNumber", hotelInputs.mobileNumber.toString());
    formData.append("CheckOutTime", hotelInputs.checkOutTime);
    formData.append("Address)", hotelInputs.address);
    formData.append("ImageURL", hotelInputs.imageURL || "");
    formData.append("StateId", hotelInputs.stateId?.toString() || "");
    formData.append("CountryId", hotelInputs.countryId?.toString() || "");
    formData.append("CityId", hotelInputs.cityId?.toString() || "");
    formData.append("IsActive", isChecked.toString());

    try {
      let response: apiResponse;

      if (id) {
        formData.append("Id", id);
        response = await updateHotel({ data: formData, id });

        if (response != null && response.data?.isSuccess) {
          toastNotify("Hotel updated successfully", "success");
          navigate("/hotel/hotellist");
          setLoading(true);
        } else {
          toastNotify("Invalid Hotel Data", "error");
        }
      } else {
        debugger;
        response = await createHotel(formData);

        if (response != null && response.data?.isSuccess) {
          toastNotify("Hotel created successfully", "success");
          navigate("/hotel/hotellist");
        } else {
          toastNotify("Invalid HotelApi Response", "error");
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      toastNotify("Error occurred", "error");
    }
    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">{id ? "Edit Hotel" : "Add Hotel"}</h3>

      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <label htmlFor="Name">Hotel Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter hotelName"
              required
              name="name"
              value={hotelInputs.name}
              onChange={handleHotelInput}
            />
            <label htmlFor="Details">Hotel Details</label>
            <input
              type="text"
              className="form-control"
              required
              name="details"
              value={hotelInputs.details}
              onChange={handleHotelInput}
            />
            <label htmlFor="foundingYear">StartingPrice</label>
            <input
              type="number"
              className="form-control"
              required
              name="startingPrice"
              value={hotelInputs.startingPrice}
              onChange={handleHotelInput}
            />
            <label htmlFor="tagline">CheckInTime</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter CheckInTime "
              required
              name="checkInTime"
              value={hotelInputs.checkInTime}
              onChange={handleHotelInput}
              
            />
            <label htmlFor="tagline">CheckOutTime</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter CheckOutTime "
              required
              name="checkOutTime"
              value={hotelInputs.checkOutTime}
              onChange={handleHotelInput}
            />

            <label htmlFor="text">MobileNumber</label>
            <input
              type="tel" // Change the type to "tel" for better compatibility
              className="form-control"
              placeholder="Please enter a 10-digit mobile number."
              required
              name="mobileNumber"
              value={hotelInputs.mobileNumber}
              onChange={handleHotelInput}
              maxLength={10} // Set maxLength to 10
              pattern="[0-9]{10}" // Use a pattern to allow only numeric input with exactly 10 digits
            />
            

            <label htmlFor="facebookURL">Address</label>
            <input
              type="text"
              className="form-control"
              required
              name="address"
              value={hotelInputs.address}
              onChange={handleHotelInput}
            />
            <label htmlFor="linkedInURL">ImageURL </label>
            <input
              type="text"
              className="form-control"
              required
              name="imageURL"
              value={hotelInputs.imageURL}
              onChange={handleHotelInput}
            />

            {/* Country selection */}
            <label htmlFor="country">Select country</label>
            <select
              className="form-control"
              name="countryId"
              value={selectedCountry}
              onChange={(e) => {
                const countryId = parseInt(e.target.value);
                setSelectedCountry(countryId);
                setSelectedState(undefined); // Reset state when country changes
                setHotelInputs((prevData) => ({ ...prevData, countryId }));
              }}
            >
              <option value="">Select Country</option>
              {countrysData?.result.map((country: any) => (
                <option key={country.id} value={country.id}>
                  {country.countryName}
                </option>
              ))}
            </select>

            {/* State selection */}
            <label htmlFor="state">Select State</label>
            <select
              className="form-control"
              name="stateId"
              value={selectedState}
              onChange={(e) => {
                const stateId = parseInt(e.target.value);
                setSelectedState(stateId);
                setHotelInputs((prevData) => ({ ...prevData, stateId }));
              }}
            >
              <option value="">Select State</option>
              {statesData?.result
                .filter((state: any) => state.countryId === selectedCountry)
                .map((state: any) => (
                  <option key={state.id} value={state.id}>
                    {state.stateName}
                  </option>
                ))}
            </select>
            {/* City selection */}
            <label htmlFor="city">Select city</label>
            <select
              className="form-control"
              name="cityId"
              value={hotelInputs.cityId}
              onChange={(e) =>
                setHotelInputs((prevData) => ({
                  ...prevData,
                  cityId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select city</option>
              {citysData?.result
                .filter((city: any) => city.stateId === selectedState)
                .map((city: any) => (
                  <option key={city.id} value={city.id}>
                    {city.cityName}
                  </option>
                ))}
            </select>

            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              checked={isChecked}
              onChange={handleOnChange}
            />

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/hotel/hotellist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to HotelList
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HotelUpsert;
