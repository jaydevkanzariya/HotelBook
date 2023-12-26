import React, { useEffect, useState } from "react";
import {
  useCreatePolicyMutation,
  useGetPolicyByIdQuery,
  useUpdatePolicyMutation,
} from "../../Apis/policyApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common";
import { apiResponse } from "../../Interfaces";

// const policyData = {
//   addPolicy: "",
//   isActive: true,
// };
const policyData: { addPolicy: string;  } = {
  addPolicy: "",
  // isActive: false,
};

function PolicyUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [policyInputs, setPolicyInputs] = useState(policyData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createPolicy] = useCreatePolicyMutation();
  const [updatePolicy] = useUpdatePolicyMutation();
  const { data } = useGetPolicyByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        addPolicy: data.result.addPolicy,
        // isActive: data.result.isActive,
      };
      setPolicyInputs(tempData);
      // setIsChecked(tempData.isActive);

    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setPolicyInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handlePolicyInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, policyInputs);
    setPolicyInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("AddPolicy", policyInputs.addPolicy);
    

  try {
    let response : apiResponse;

    if (id) {
      formData.append("Id", id);
      response = await updatePolicy({ data: formData, id });

      if (response != null && response.data?.isSuccess) {
        toastNotify("Policy updated successfully", "success");
        navigate("/policy/policylist");
        setLoading(true);
      } else {
        toastNotify("Invalid Policy Data", "error");
      }
    } else {
      response = await createPolicy(formData);

      if (response != null && response.data?.isSuccess) {
        toastNotify("Policy Create successfully", "success");
        navigate("/policy/policylist");
      } else {
        toastNotify("Invalid PolicyApi Response", "error");
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
        {id ? "Edit Policy" : "Add Policy"}
      </h3>
      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name Policy"
              required
              name="addPolicy"
              value={policyInputs.addPolicy}
              onChange={handlePolicyInput}
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
                  onClick={() => navigate("/policy/policylist")}
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

export default PolicyUpsert;
