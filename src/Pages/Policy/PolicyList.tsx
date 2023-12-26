import React, { useState } from "react";
import {
  useDeletePolicyMutation,
  useGetPolicysQuery,
} from "../../Apis/policyApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Componets/Page/Common";
import { policyModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function PolicyList() {
  const [deletePolicy] = useDeletePolicyMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetPolicysQuery({
    search: searchQuery,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });
  const navigate = useNavigate();

  const debouncedSearch = debounce(() => refetch(), 300);

  const handlePolicyDelete = async (id: number) => {
    toast.promise(
      deletePolicy(id),
      {
        pending: "Processing your request...",
        success: "Policy Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setPageNumber(1);
    debouncedSearch();
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && !isError && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Policy List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/policy/policyupsert")}
            >
              Add New Policy
            </button>
          </div>
          <div className="row border p-2">
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button className="btn btn-success" onClick={debouncedSearch}>
                Search
              </button>
            </div>
          </div>
          <br />

          <div className="">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-4">PolicyName</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((policy: policyModel) => {
              return (
                <div className="row border" key={policy.id}>
                  <div className="col-1">{policy.id}</div>
                  <div className="col-4">{policy.addPolicy}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/policy/policyupsert/" + policy.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handlePolicyDelete(policy.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="pagination">
              <button
                className="btn btn-link"
                disabled={pageNumber === 1}
                onClick={() => setPageNumber((prev) => prev - 1)}
              >
                Previous
              </button>
              <span> Page {pageNumber} </span>
              <button
                className="btn btn-link"
                disabled={data.result.length < pageSize}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PolicyList;
