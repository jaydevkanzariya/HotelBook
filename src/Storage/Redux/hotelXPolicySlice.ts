import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelXPolicy: [],
};

export const hotelXPolicySlice = createSlice({
  name: "HotelXPolicy",
  initialState: initialState,
  reducers: {
    setHotelXPolicy: (state, action) => {
      state.hotelXPolicy = action.payload;
    },
  },
});

export const { setHotelXPolicy } = hotelXPolicySlice.actions;
export const hotelXPolicyReducer = hotelXPolicySlice.reducer;
