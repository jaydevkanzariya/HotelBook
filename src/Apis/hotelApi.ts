import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44342/api/v1/",
  }),
  tagTypes: ["Hotels"],
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: ({search, pageSize, pageNumber}) => ({
        url: "HotelAPI/GetHotels",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["Hotels"],
    }),
    getAllHotels: builder.query({
      query: () => ({
        url: "HotelAPI/GetHotels",
        method: "GET",
      }),
      providesTags: ["Hotels"],
    }),
    getHotelSearchByLazyLoading: builder.query({
      query: ({ pageNum, search }) => ({
        url: "HotelAPI/HotelSearchByLazyLoading",
        method: "Get",
        params: { pageNum, search },
      }),
      providesTags: ["Hotels"],
    }),
    getHotelById: builder.query({
      query: (id) => ({
        url: `HotelAPI/GetHotel/${id}`,
      }),
      providesTags: ["Hotels"],
    }),
    createHotel: builder.mutation({
      query: (data) => ({
        url: "HotelAPI/CreateHotel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Hotels"],
    }),
    updateHotel: builder.mutation({
      query: ({ data, id }) => ({
        url: "HotelAPI/UpdateHotel/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Hotels"],
    }),
    deleteHotel: builder.mutation({
      query: (id) => ({
        url: "HotelAPI/DeleteHotel/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Hotels"],
    }),
    
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelSearchByLazyLoadingQuery,
  useGetHotelByIdQuery,
  useGetAllHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelApi;

export default hotelApi;
