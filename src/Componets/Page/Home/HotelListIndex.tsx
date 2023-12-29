import React, { useState, useEffect } from "react";
import { useGetHotelSearchByLazyLoadingQuery, } from "../../../Apis/hotelApi";
import { hotelModel } from "../../../Interfaces";
import HotelIndex from "./HotelIndex";
import { useDispatch } from "react-redux";
import { setHotel } from "../../../Storage/Redux/hotelSlice";
import { MainLoader,MiniLoader } from "../Common";

function HotelListIndex() {
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

  const handleScroll = () => {
    if (!loading && hasMore) {
      const isReachedScrollEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isReachedScrollEnd) {
        setLoading(true);
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center"></ul>
      </div>

      {allHotels.length > 0 &&
        allHotels.map((hotel: hotelModel, index: number) => (
          <HotelIndex hotel={hotel} key={index} />
        ))}

      {loading && <MainLoader />}
      {!loading && !hasMore && <p>No more hotels to load</p>}
    </div>
  );
}

export default HotelListIndex;




