import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const hotelXPolicyApi = createApi({
  reducerPath: "hotelXPolicyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44342/api/v1/",
  }),
  tagTypes: ["HotelXPolicys"],
  endpoints: (builder) => ({
    getHotelXPolicys: builder.query({
      query: () => ({
        url: "HotelXPolicyAPI/GetHotelXPolicys",
      }),
      providesTags: ["HotelXPolicys"],
    }),

    getHotelXPolicyById: builder.query({
      query: (id) => ({
        url: `HotelXPolicyAPI/GetHotelXPolicy/${id}`,
      }),
      providesTags: ["HotelXPolicys"],
    }),

    getHotelXPolicyByHotelId: builder.query({
      query: (hotelId) => ({
        url: `HotelXPolicyAPI/GetHotelXPolicyByHotelId/${hotelId}`,
      }),
      providesTags: ["HotelXPolicys"],
    }),

    createHotelXPolicy: builder.mutation({
      query: (data) => ({
        url: "HotelXPolicyAPI/CreateHotelXPolicy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["HotelXPolicys"],
    }),

    updateHotelXPolicy: builder.mutation({
      query: ({ data, id }) => ({
        url: "HotelXPolicyAPI/UpdateHotelXPolicy/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["HotelXPolicys"],
    }),
    
    deleteHotelXPolicy: builder.mutation({
      query: (id) => ({
        url: "HotelXPolicyAPI/DeleteHotelXPolicy/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["HotelXPolicys"],
    }),
  }),
});

export const {
  useGetHotelXPolicysQuery,
  useGetHotelXPolicyByIdQuery,
  useCreateHotelXPolicyMutation,
  useUpdateHotelXPolicyMutation,
  useDeleteHotelXPolicyMutation,
  useGetHotelXPolicyByHotelIdQuery,
} = hotelXPolicyApi;
export default hotelXPolicyApi;
