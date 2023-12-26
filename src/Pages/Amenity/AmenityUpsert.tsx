import React, { useEffect, useState } from "react";
import {
  useCreateAmenityMutation,
  useGetAmenityByIdQuery,
  useUpdateAmenityMutation,
} from "../../Apis/amenityApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common";
import { apiResponse } from "../../Interfaces";

// const amenityData = {
//   amenityName: "",
//   isActive: true,
// };
const amenityData: { amenityName: string;  } = {
  amenityName: "",
  // isActive: false,
};

function AmenityUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [amenityInputs, setAmenityInputs] = useState(amenityData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createAmenity] = useCreateAmenityMutation();
  const [updateAmenity] = useUpdateAmenityMutation();
  const { data } = useGetAmenityByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        amenityName: data.result.amenityName,
        // isActive: data.result.isActive,
      };
      setAmenityInputs(tempData);
      // setIsChecked(tempData.isActive);

    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setAmenityInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleAmenityInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, amenityInputs);
    setAmenityInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("AmenityName", amenityInputs.amenityName);
    

  try {
    let response : apiResponse;

    if (id) {
      formData.append("Id", id);
      response = await updateAmenity({ data: formData, id });

      if (response != null && response.data?.isSuccess) {
        toastNotify("Amenity updated successfully", "success");
        navigate("/amenity/amenitylist");
        setLoading(true);
      } else {
        toastNotify("Invalid Amenity Data", "error");
      }
    } else {
      response = await createAmenity(formData);

      if (response != null && response.data?.isSuccess) {
        toastNotify("Amenity Create successfully", "success");
        navigate("/amenity/amenitylist");
      } else {
        toastNotify("Invalid AmenityApi Response", "error");
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
      <h3 className=" px-2 text-success">
        {id ? "Edit Amenity" : "Add Amenity"}
      </h3>
      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name Amenity"
              required
              name="amenityName"
              value={amenityInputs.amenityName}
              onChange={handleAmenityInput}
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
                  onClick={() => navigate("/amenity/amenitylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Menu Items
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AmenityUpsert;
