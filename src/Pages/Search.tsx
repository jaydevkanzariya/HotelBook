import React from "react";
import { HotelListSearchIndex} from "../Componets/Page/Home";
import {Banner} from "../Componets/Page/Common"

function Search() {
  return (
    <div>
      <Banner/>
      <div className="container p-2">
        <HotelListSearchIndex/>
      </div>
    </div>
  )
}

export default Search;
