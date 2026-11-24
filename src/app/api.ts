import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GymClass } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Class"],
  endpoints: (builder) => ({
    // GET /classes o GET /classes?activity:contains=yoga
    getClasses: builder.query<GymClass[], string>({
      query: (activity) =>
        activity
          ? `/classes?activity:contains=${encodeURIComponent(activity)}`
          : "/classes",
      providesTags: ["Class"],
    }),

    // GET /classes/:id
    getClass: builder.query<GymClass, string>({
      query: (id) => `/classes/${id}`,
      providesTags: ["Class"],
    }),
  }),
});

export const { useGetClassesQuery, useGetClassQuery } = api;
