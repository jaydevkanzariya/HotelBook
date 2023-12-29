import React, { useState } from "react";
import {
  useDeleteHotelMutation,
  useGetHotelsQuery,
} from "../../Apis/hotelApi";
import { toast } from "react-toastify";

import { MainLoader } from "../../Componets/Page/Common";
import { hotelModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function HotelList() {
  const [deleteHotel] = useDeleteHotelMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetHotelsQuery({
    search: searchQuery,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });
  const navigate = useNavigate();

  const debouncedSearch = debounce(() => refetch(), 300);

  const handleHotelDelete = async (id: number) => {
    toast.promise(
      deleteHotel(id),
      {
        pending: "Processing your request...",
        success: "Hotel Deleted Successfully 👌",
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
            <h1 className="text-success">Hotel List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/hotel/hotelupsert")}
            >
              Add New Hotel
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
              <div className="col-2">HotelName</div>
              <div className="col-2">StartingPrice</div>
              <div className="col-1">IsActive</div>
              <div className="col-2">HotelXAmenity</div>
              <div className="col-2">HotelXPolicy</div>
              <div className="col-3">Action</div>
            </div>

            {data.result.map((hotel: hotelModel) => {
              return (
                <div className="row border" key={hotel.id}>
                  <div className="col-2">{hotel.name}</div>
                  <div className="col-2">{hotel.startingPrice}</div>
                  <div className="col-1">{hotel.isActive?.toString()}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/hotelXAmenity/hotelXAmenityUpsert/" + hotel.id)}
                    >
                      HotelXAmenity
                      
                    </button>
                   </div>
                   <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/hotelXPolicy/hotelXPolicyUpsert/" + hotel.id)}
                    >
                      HotelXPolicy
                      
                    </button>
                   </div>
                  <div className="col-3">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/hotel/hotelupsert/" + hotel.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleHotelDelete(hotel.id)}
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
export default HotelList;
