import React, { useState, useEffect } from "react";
import { useGetHotelSearchByLazyLoadingQuery } from "../../../Apis/hotelApi";
import { hotelModel } from "../../../Interfaces";
import { MainLoader } from "../Common";
import { useParams } from "react-router-dom";
import HotelIndex from "./HotelIndex";

function HotelListSearchIndex() {
    
  const { search } = useParams();
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allHotels, setAllHotels] = useState<hotelModel[]>([]);
  const { data, isLoading } = useGetHotelSearchByLazyLoadingQuery({
    pageNum,
    search: search || "",
  });

  useEffect(() => {
    if (!isLoading && data && data.result) {
      setAllHotels((prevHotels) => [...prevHotels, ...data.result]);
      setLoading(false);
    }
  }, [isLoading, data]);

  const handleScroll = () => {
    if (!loading && data && data.result && data.result.length > 0) {
      const isReachedScrollEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

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
  }, [loading, data]);

  useEffect(() => {
    // Reset the state when the search term changes
    setAllHotels([]);
    setPageNum(0);
  }, [search]);

  if (isLoading) {
    return <MainLoader />;
  }

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
      {loading && data && data.result && data.result.length === 0 && (
        <p>No more hotels to load</p>
      )}
    </div>
  );
}

export default HotelListSearchIndex;
