import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const policyApi = createApi({
  reducerPath: "policyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44342/api/v1/",
  }),
  tagTypes: ["Policys"],
  endpoints: (builder) => ({
    getPolicys: builder.query({
      query: ({search, pageSize, pageNumber}) => ({
        url: "PolicyAPI/GetPolicys",
        method: "GET",
        params: { search, pageSize, pageNumber },
      }),
      providesTags: ["Policys"],
    }),
    getAllPolicys: builder.query({
      query: () => ({
        url: "PolicyAPI/GetPolicys",
        method: "GET",
      }),
      providesTags: ["Policys"],
    }),
    getPolicyById: builder.query({
      query: (id) => ({
        url: `PolicyAPI/GetPolicy/${id}`,
      }),
      providesTags: ["Policys"],
    }),
    createPolicy: builder.mutation({
      query: (data) => ({
        url: "PolicyAPI/CreatePolicy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Policys"],
    }),
    updatePolicy: builder.mutation({
      query: ({ data, id }) => ({
        url: "PolicyAPI/UpdatePolicy/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Policys"],
    }),
    deletePolicy: builder.mutation({
      query: (id) => ({
        url: "PolicyAPI/DeletePolicy/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Policys"],
    }),
  }),
});

export const {
  useGetPolicysQuery,
  useGetAllPolicysQuery,
  useGetPolicyByIdQuery,
  useCreatePolicyMutation,
  useUpdatePolicyMutation,
  useDeletePolicyMutation,
} = policyApi;

export default policyApi;
