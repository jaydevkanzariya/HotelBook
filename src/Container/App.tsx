import React, { useState } from "react";
import { Header, Footer, AdminHeader } from "../Componets/Layout";
import { 
  Home, 
  ApplicationRoleList,
  ApplicationRoleUpsert,
  ApplicationUserList,
  ApplicationUserUpsert,
  CountryList,
   CountryUpsert, 
    StateList,
    StateUpsert,
    CityList,
    CityUpsert,
  Login,
  Search,
  Register,
  AdminHome,
  AccessDenied,
  PolicyList,
  PolicyUpsert,
  

} from "../Pages";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const receivedRoles = ["Customer", "Admin", "Data Operator"]; 
  const [userRole, setUserRole] = useState(receivedRoles);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      const decodedToken = parseJwt(token);
      setUserName(decodedToken.unique_name);
      setUserRole(decodedToken.role || []);
    } else {
      setLoggedIn(false);
      setUserName("");
      setUserRole([]);
    }
  }, []);
  const parseJwt = (token: any) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
  return (
    <div>
        { (!userRole.includes("Data Operator") ) && (!userRole.includes("Admin")) && (
      <Header />
        )}

      {(userRole.includes("Data Operator") || userRole.includes("Admin")) && (
  <AdminHeader />
)}

      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AdminHome" element={<AdminHome />} />

          <Route path="/search/:search" element={<Search />} />

          <Route path="/accessDenied"  element={<AccessDenied/>} />

          <Route path="/applicationRole/applicationRolelist" element={< ApplicationRoleList/>} />
          <Route path="/applicationRole/applicationRoleUpsert/:id" element={<ApplicationRoleUpsert />} />
          <Route path="/applicationRole/applicationRoleUpsert" element={<ApplicationRoleUpsert />} />

          
          <Route path="/applicationUser/applicationUserlist" element={< ApplicationUserList/>} />
          <Route path="/applicationUser/applicationUserUpsert/:userId" element={<ApplicationUserUpsert />} />
          <Route path="/applicationUser/applicationUserUpsert" element={<ApplicationUserUpsert />} />

          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />

          <Route path="/country/countrylist" element={<CountryList />} />
          <Route path="/country/countryUpsert/:id" element={<CountryUpsert />} />
          <Route path="/country/countryUpsert" element={<CountryUpsert />} />

          <Route path="/state/statelist" element={<StateList />} />
          <Route path="/state/stateUpsert/:id" element={<StateUpsert />} />
          <Route path="/state/stateUpsert" element={<StateUpsert />} />

          <Route path="/city/citylist" element={<CityList />} />
          <Route path="/city/cityUpsert/:id" element={<CityUpsert />} />
          <Route path="/city/cityUpsert" element={<CityUpsert />} />

          <Route path="/policy/policylist" element={<PolicyList />} />
          <Route path="/policy/policyUpsert/:id" element={<PolicyUpsert />} />
          <Route path="/policy/policyUpsert" element={<PolicyUpsert />} />

          <Route path="/amenity/amenitylist" element={<PolicyList />} />
          <Route path="/amenity/amenityUpsert/:id" element={<PolicyUpsert />} />
          <Route path="/amenity/amenityUpsert" element={<PolicyUpsert />} />

          <Route path="/hotel/hotellist" element={<PolicyList />} />
          <Route path="/hotel/hotelUpsert/:id" element={<PolicyUpsert />} />
          <Route path="/hotel/hotelUpsert" element={<PolicyUpsert />} />


        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;



