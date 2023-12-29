import React, { useEffect, useState } from "react";
import { useGetHotelByIdQuery } from "../../Apis/hotelApi";
import { useGetPolicysQuery,useGetAllPolicysQuery } from "../../Apis/policyApi";
import { useGetHotelXPolicysQuery,
  useGetHotelXPolicyByIdQuery,
  useCreateHotelXPolicyMutation,
  useUpdateHotelXPolicyMutation,
  useDeleteHotelXPolicyMutation,
  useGetHotelXPolicyByHotelIdQuery } from "../../Apis/hotelXPolicyApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function HotelXPolicyUpsert() {
  debugger
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: hotelData } = useGetHotelByIdQuery(hotelId);
  const { data: policyData } = useGetAllPolicysQuery(null);
  const { data: hotelXPolicyData } =  useGetHotelXPolicyByHotelIdQuery (hotelId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedPolicyIds, setSelectedPolicyIds] = useState<string[]>([]);
  const [createHotelXPolicy] = useCreateHotelXPolicyMutation();

  useEffect(() => {
    if (policyData) {
      const initialCheckedMap: Record<string, boolean> = {};
      hotelXPolicyData?.result.forEach((item: any) => {
        initialCheckedMap[item.policyId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedPolicyIds(hotelXPolicyData?.result.map((item: any) => item.policyId) || []);
    }
  }, [policyData, hotelXPolicyData]);

  const handleOnChange = (policyId: string) => {
    debugger
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [policyId]: !prevMap[policyId],
    }));
    
    setSelectedPolicyIds((prevIds) => {
      if (prevIds.includes(policyId)) {
        
        // If policyId is already in the list, remove it
        return prevIds.filter((id) => id !== policyId);
      } else {
        // If policyId is not in the list, add it
        return [...prevIds, policyId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (hotelId) {
      formData.append("HotelId", hotelId);
      selectedPolicyIds.forEach((policyId) => {
        formData.append("SelectedPolicyIds", policyId);
      });

      const response = await createHotelXPolicy(formData);
      if (response) {
        toastNotify("Policy updated successfully", "success");
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
              <label>Select Policys:</label>
              {policyData?.result.map((policy: any) => (
                <div key={policy.id} className="form-check">
                  <input
                    type="checkbox"
                    name="SelectedPolicyIds"
                    className="form-check-input"
                    id={`payment-${policy.id}`}
                    value={policy.id}
                    checked={isCheckedMap[policy.id] || false}
                    onChange={() => handleOnChange(policy.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`policy-${policy.id}`}
                  >
                    {policy.addPolicy}
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

export default HotelXPolicyUpsert;
