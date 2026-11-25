import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GymClass, NewGymClass, User } from "./types";
import type { RootState } from "./store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    // Envía el token en cada petición
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Class"],
  endpoints: (builder) => ({
    // GET /classes o GET /classes?activity=yoga
    getClasses: builder.query<GymClass[], string>({
      query: (activity) =>
        activity
          ? `/classes?activity=${encodeURIComponent(activity)}`
          : "/classes",
      providesTags: ["Class"],
    }),

    // GET /classes/:id
    getClass: builder.query<GymClass, string>({
      query: (id) => `/classes/${id}`,
      providesTags: ["Class"],
    }),

    // ¿Quién soy? GET /auth/me. El token se envía en la cabecera (prepareHeaders);
    // el argumento solo sirve de clave de caché para no mezclar sesiones
    getMe: builder.query<User, string>({
      query: () => "/auth/me",
    }),

    // POST /auth/register. El rol lo decide la API
    register: builder.mutation<User, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),

    // POST /classes (solo staff)
    createClass: builder.mutation<GymClass, NewGymClass>({
      query: (newClass) => ({ url: "/classes", method: "POST", body: newClass }),
      invalidatesTags: ["Class"],
    }),

    // DELETE /classes/:id (solo staff)
    deleteClass: builder.mutation<GymClass, number>({
      query: (id) => ({ url: `/classes/${id}`, method: "DELETE" }),
      invalidatesTags: ["Class"],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassQuery,
  useGetMeQuery,
  useLazyGetMeQuery,
  useRegisterMutation,
  useCreateClassMutation,
  useDeleteClassMutation,
} = api;
