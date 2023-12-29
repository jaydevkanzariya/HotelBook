import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelXAmenity: [],
};

export const hotelXAmenitySlice = createSlice({
  name: "HotelXAmenity",
  initialState: initialState,
  reducers: {
    setHotelXAmenity: (state, action) => {
      state.hotelXAmenity = action.payload;
    },
  },
});

export const { setHotelXAmenity } = hotelXAmenitySlice.actions;
export const hotelXAmenityReducer = hotelXAmenitySlice.reducer;
