import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotel: [],
};

export const hotelSlice = createSlice({
  name: "Hotel",
  initialState: initialState,
  reducers: {
    setHotel: (hotel, action) => {
      hotel.hotel = action.payload;
    },
  },
});

export const { setHotel } = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
