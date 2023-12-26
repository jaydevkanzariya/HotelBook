import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const amenityApi = createApi({
  reducerPath: "amenityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44342/api/v1/",
  }),
  tagTypes: ["Amenitys"],
  endpoints: (builder) => ({
    getAmenitys: builder.query({
      query: ({search, pageSize, pageNumber}) => ({
        url: "AmenityAPI/GetAmenitys",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["Amenitys"],
    }),
    getAllAmenitys: builder.query({
      query: () => ({
        url: "AmenityAPI/GetAmenitys",
        method: "GET",
      }),
      providesTags: ["Amenitys"],
    }),
    getAmenityById: builder.query({
      query: (id) => ({
        url: `AmenityAPI/GetAmenity/${id}`,
      }),
      providesTags: ["Amenitys"],
    }),
    createAmenity: builder.mutation({
      query: (data) => ({
        url: "AmenityAPI/CreateAmenity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Amenitys"],
    }),
    updateAmenity: builder.mutation({
      query: ({ data, id }) => ({
        url: "AmenityAPI/UpdateAmenity/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Amenitys"],
    }),
    deleteAmenity: builder.mutation({
      query: (id) => ({
        url: "AmenityAPI/DeleteAmenity/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Amenitys"],
    }),
  }),
});

export const {
  useGetAmenitysQuery,
  useGetAllAmenitysQuery,
  useGetAmenityByIdQuery,
  useCreateAmenityMutation,
  useUpdateAmenityMutation,
  useDeleteAmenityMutation,
} = amenityApi;

export default amenityApi;
