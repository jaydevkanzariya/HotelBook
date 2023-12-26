import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amenity: [],
};

export const amenitySlice = createSlice({
  name: "Amenity",
  initialState: initialState,
  reducers: {
    setAmenity: (state, action) => {
      state.amenity = action.payload;
    },
  },
});

export const { setAmenity } = amenitySlice.actions;
export const amenityReducer = amenitySlice.reducer;
