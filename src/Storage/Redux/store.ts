import { configureStore } from "@reduxjs/toolkit";
import { applicationRoleReducer } from "./applicationRoleSlice";
import { applicationUserReducer } from "./applicationUserSlice";
import { applicationUserRoleReducer } from "./applicationUserRoleSlice";
import { userAuthReducer } from "./userAuthSlice";
import { countryReducer } from "./countrySlice";
import { stateReducer } from "./stateSlice";
import { cityReducer } from "./citySlice";
import { policyReducer } from "./policySlice";
import { hotelReducer } from "./hotelSlice";
import { amenityReducer } from "./amenitySlice";
import {hotelXAmenityReducer} from "./hotelXAmenitySlice";
import {hotelXPolicyReducer} from "./hotelXPolicySlice";

import {
  applicationRoleApi,
  applicationUserApi,
  applicationUserRoleApi,
  usersApi,
  countryApi,
  stateApi,
  cityApi,
  policyApi,
  hotelApi,
  amenityApi,
  hotelXAmenityApi,
  hotelXPolicyApi,
} from "../../Apis";


const store = configureStore({
  reducer: {
    applicationRoleStore : applicationRoleReducer,
    applicationUserStore : applicationUserReducer,
    applicationUserRoleStore : applicationUserRoleReducer,
    userAuthStore : userAuthReducer,
    countryStore: countryReducer,
    stateStore: stateReducer,
    cityStore: cityReducer,
    policyStore: policyReducer,
    hotelStore: hotelReducer,
    amenityStore: amenityReducer,
    hotelXAmenityStore: hotelXAmenityReducer,
    hotelXPolicyStore: hotelXPolicyReducer,



    [applicationRoleApi.reducerPath] : applicationRoleApi.reducer,
    [applicationUserApi.reducerPath] : applicationUserApi.reducer,
    [applicationUserRoleApi.reducerPath] : applicationUserRoleApi.reducer,
    [usersApi.reducerPath] : usersApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [stateApi.reducerPath]: stateApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [policyApi.reducerPath]: policyApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [amenityApi.reducerPath]: amenityApi.reducer,
    [hotelXAmenityApi.reducerPath]: hotelXAmenityApi.reducer,
    [hotelXPolicyApi.reducerPath]: hotelXPolicyApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(applicationRoleApi.middleware)
      .concat(applicationUserApi.middleware)
      .concat(applicationUserRoleApi.middleware)
      .concat(usersApi.middleware)
      .concat(countryApi.middleware)
      .concat(stateApi.middleware)
      .concat(cityApi.middleware)
      .concat(policyApi.middleware)
      .concat(hotelApi.middleware)
      .concat(amenityApi.middleware)
      .concat(hotelXAmenityApi.middleware)
      .concat(hotelXPolicyApi.middleware)


});

export type RootState = ReturnType<typeof store.getState>;

export default store;
