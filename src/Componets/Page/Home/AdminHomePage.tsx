import React, { useState, useEffect } from "react";
import { useGetHotelSearchByLazyLoadingQuery } from "../../../Apis/hotelApi";
import { hotelModel } from "../../../Interfaces";
import HotelIndex from "./HotelIndex";
import { useDispatch } from "react-redux";
import { setHotel } from "../../../Storage/Redux/hotelSlice";
import { MainLoader,MiniLoader } from "../Common";

function AdminHomePage() {
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allHotels, setAllHotels] = useState<hotelModel[]>([]);

  const dispatch = useDispatch();
  const search = "";

  const { data, isLoading } = useGetHotelSearchByLazyLoadingQuery({
    pageNum,
    search: search || "",
  });

  useEffect(() => {
    if (!isLoading && data && data.result) {
      setAllHotels((prevHotels) => [...prevHotels, ...data.result]);
      setLoading(false);
      setHasMore(data.result.length > 0);
    }
  }, [isLoading, data]);



 

  return (
    <div className="container row">
      <h2>
        Hello Admin
      </h2>

    </div>
  );
}

export default AdminHomePage;




