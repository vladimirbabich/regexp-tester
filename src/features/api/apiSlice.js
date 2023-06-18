import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const apiBaseUrl = 'https://regexp-tester-server.vercel.app/api/';
const apiBaseUrl = 'http://localhost:7000/api/';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Read the token from localStorage
      const token = localStorage.getItem('userToken');

      if (token) {
        // Add the token to the Authorization header
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Test', 'Quiz'],
  endpoints: (builder) => ({
    //test
    sendTest: builder.mutation({
      query: (payload) => ({
        url: 'test/create',
        method: 'POST',
        // headers:{}
        body: payload,
      }),
      invalidatesTags: ['Test'],
    }),
    getTestsForMode: builder.query({
      query: ({ modeName, limit }) =>
        `test/getallformode?modeName=${modeName}&limit=${limit}`,
      providesTags: (result) => ['Test'],
    }),
    //user
    regUser: builder.mutation({
      query: (payload) => ({
        url: 'user/',
        method: 'POST',
        body: payload,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: 'user/login',
        method: 'POST',
        body: payload,
      }),
    }),
    getUniqueNickname: builder.query({
      query: () => `user/getuniquenickname`,
    }),
    checkAuth: builder.query({
      query: (token) => ({
        url: 'user/auth',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    //question
    createQuestion: builder.mutation({
      //later
      query: (payload) => ({
        url: 'question/create',
        method: 'POST',
        body: payload,
      }),
    }),
    getAllQuestionsForMode: builder.query({
      query: (modeName) => `question/getallformode?modeName=${modeName}`,
    }),
    //quiz
    getQuestionsOfQuiz: builder.query({
      query: (id) => `quiz/get-questions/${id}`,
    }),
    getQuiz: builder.query({
      query: (id) => (id ? `quiz/get/${id}` : `quiz/get/`),
    }),
    //user-quiz
    getUserQuizzesForMode: builder.query({
      query: ({ id, limit }) => `user-quiz/all/${id}?limit=${limit}`,
      providesTags: (result) => ['Quiz'],
    }),
    sendUserQuiz: builder.mutation({
      query: (payload) => ({
        url: 'user-quiz/create',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Quiz'],
    }),
  }),
});

export const {
  useSendTestMutation,
  useLazyGetTestsForModeQuery,
  useRegUserMutation,
  useLoginUserMutation,
  useGetUniqueNicknameQuery,
  useLazyCheckAuthQuery,
  useGetAllQuestionsForModeQuery,
  useSendUserQuizMutation,
  useGetQuestionsOfQuizQuery,
  useGetQuizQuery,
  useLazyGetUserQuizzesForModeQuery,
} = apiSlice;
