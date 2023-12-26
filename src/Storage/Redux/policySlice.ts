import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  policy: [],
};

export const policySlice = createSlice({
  name: "Policy",
  initialState: initialState,
  reducers: {
    setPolicy: (state, action) => {
      state.policy = action.payload;
    },
  },
});

export const { setPolicy } = policySlice.actions;
export const policyReducer = policySlice.reducer;
