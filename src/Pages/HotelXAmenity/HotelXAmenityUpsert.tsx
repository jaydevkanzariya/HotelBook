import React, { useEffect, useState } from "react";
import { useGetHotelByIdQuery } from "../../Apis/hotelApi";
import { useGetAmenitysQuery, useGetAllAmenitysQuery} from "../../Apis/amenityApi";
import { useGetHotelXAmentiysQuery,
  useGetHotelXAmentiyByIdQuery,
  useCreateHotelXAmentiyMutation,
  useUpdateHotelXAmentiyMutation,
  useDeleteHotelXAmentiyMutation,
  useGetHotelXAmentiyByHotelIdQuery } from "../../Apis/hotelXAmenityApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function HotelXAmenityUpsert() {
  debugger
  
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: hotelData } = useGetHotelByIdQuery(hotelId);
  const { data: amenityData } = useGetAllAmenitysQuery(null);
  const { data: hotelXAmenityData } = useGetHotelXAmentiyByHotelIdQuery (hotelId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedAmenityIds, setSelectedAmenityIds] = useState<string[]>([]);
  const [createHotelXAmenity] = useCreateHotelXAmentiyMutation();

  useEffect(() => {
    if (amenityData) {
      const initialCheckedMap: Record<string, boolean> = {};
      hotelXAmenityData?.result.forEach((item: any) => {
        initialCheckedMap[item.amenityId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedAmenityIds(hotelXAmenityData?.result.map((item: any) => item.amenityId) || []);
    }
  }, [amenityData, hotelXAmenityData]);

  const handleOnChange = (amenityId: string) => {
  
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [amenityId]: !prevMap[amenityId],
    }));
    
    setSelectedAmenityIds((prevIds) => {
      debugger
      if (prevIds.includes(amenityId)) {
        
        // If amenityId is already in the list, remove it
        return prevIds.filter((id) => id !== amenityId);
      } else {
        // If amenityId is not in the list, add it
        return [...prevIds, amenityId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    debugger
    const formData = new FormData();
    
    if (hotelId) {
      formData.append("HotelId", hotelId);
      selectedAmenityIds.forEach((amenityId) => {
        formData.append("SelectedAmenityIds", amenityId);
       
      });

      const response = await createHotelXAmenity(formData);
      if (response) {
        toastNotify("HotelXAmenity updated successfully", "success");
        setLoading(false);
        navigate("/hotel/hotellist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success">{hotelData?.result.name}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="form-group">
              <label>Select Amenitys:</label>
              {amenityData?.result.map((amenity: any) => (
                <div key={amenity.id} className="form-check">
                  <input
                    type="checkbox"
                    name="SelectedAmenityIds"
                    className="form-check-input"
                    id={`payment-${amenity.id}`}
                    value={amenity.id}
                    checked={isCheckedMap[amenity.id] || false}
                    onChange={() => handleOnChange(amenity.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`amenity-${amenity.id}`}
                  >
                    {amenity.amenityName}
                  </label>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => navigate("/hotel/hotellist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to HotelList
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HotelXAmenityUpsert;
