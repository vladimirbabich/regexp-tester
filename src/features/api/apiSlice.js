import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/' }),
  endpoints: (builder) => ({
    //test
    createTest: builder.mutation({
      query: (payload) => ({
        url: 'test/create',
        method: 'POST',
        body: payload,
      }),
    }),
    getAllTestsForMode: builder.query({
      query: (modeName) => `test/getallformode?modeName=${modeName}`,
    }),
    //user
    regUser: builder.mutation({
      query: (payload) => ({
        url: 'user/',
        method: 'POST',
        body: payload,
      }),
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: 'user/update',
        method: 'POST',
        body: payload,
      }),
    }),
    getNewNickName: builder.query({
      query: () => `user/getnewnickname`,
    }),
    //question
    updateUser: builder.mutation({
      query: (payload) => ({
        url: 'question/create',
        method: 'POST',
        body: payload,
      }),
    }),
    getAllQuestionsForMode: builder.query({
      query: (modeName) => `user/getallformode?modeName=${modeName}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateTestMutation,
  useGetAllTestsForModeQuery,
  useLazyGetAllTestsForModeQuery,
  useGetNewNickNameQuery,
  useGetAllQuestionsForModeQuery,
} = apiSlice;
