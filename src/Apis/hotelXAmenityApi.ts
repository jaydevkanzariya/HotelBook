import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const hotelXAmentiyApi = createApi({
  reducerPath: "hotelXAmentiyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44342/api/v1/",
  }),
  tagTypes: ["HotelXAmentiys"],
  endpoints: (builder) => ({
    getHotelXAmentiys: builder.query({
      query: () => ({
        url: "HotelXAmentiyAPI/GetHotelXAmentiys",
      }),
      providesTags: ["HotelXAmentiys"],
    }),

    getHotelXAmentiyById: builder.query({
      query: (id) => ({
        url: `HotelXAmentiyAPI/GetHotelXAmentiy/${id}`,
      }),
      providesTags: ["HotelXAmentiys"],
    }),

    getHotelXAmentiyByHotelId: builder.query({
      query: (hotelId) => ({
        url: `HotelXAmentiyAPI/GetHotelXAmentiyByHotel/${hotelId}`,
      }),
      providesTags: ["HotelXAmentiys"],
    }),

    createHotelXAmentiy: builder.mutation({
      query: (data) => ({
        url: "HotelXAmentiyAPI/CreateHotelXAmentiy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["HotelXAmentiys"],
    }),

    updateHotelXAmentiy: builder.mutation({
      query: ({ data, id }) => ({
        url: "HotelXAmentiyAPI/UpdateHotelXAmentiy/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["HotelXAmentiys"],
    }),
    
    deleteHotelXAmentiy: builder.mutation({
      query: (id) => ({
        url: "HotelXAmentiyAPI/DeleteHotelXAmentiy/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["HotelXAmentiys"],
    }),
  }),
});

export const {
  useGetHotelXAmentiysQuery,
  useGetHotelXAmentiyByIdQuery,
  useCreateHotelXAmentiyMutation,
  useUpdateHotelXAmentiyMutation,
  useDeleteHotelXAmentiyMutation,
  useGetHotelXAmentiyByHotelIdQuery,
} = hotelXAmentiyApi;
export default hotelXAmentiyApi;
