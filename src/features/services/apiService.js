import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiBaseUrl = 'https://regexp-tester-server.vercel.app/api/';
// const apiBaseUrl = 'http://localhost:7000/api/';

// Define a service using a base URL and expected endpoints
export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      // Read the token from localStorage
      const token = localStorage.getItem('userToken');
      const genUserId = localStorage.getItem('genUserId');

      if (token) {
        // Add the token to the Authorization header
        headers.set('Authorization', `Bearer ${token}`);
      }
      if (genUserId) {
        //add genUserId to give server info, so server will not create new user
        headers.set('gen-user', genUserId);
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
        body: payload,
      }),
      invalidatesTags: ['Test'],
    }),
    getTestsForMode: builder.query({
      query: ({ modeName, limit }) =>
        `test/getallformode?modeName=${modeName}&limit=${limit}`,
      providesTags: (result) => ['Test'],
    }),
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
    checkAuth: builder.query({
      query: (token) => ({
        url: 'user/auth',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllQuestionsForMode: builder.query({
      query: (modeName) => `question/getallformode?modeName=${modeName}`,
    }),
    getQuestionsOfQuiz: builder.query({
      query: (id) => `quiz/get-questions/${id}`,
    }),
    getQuiz: builder.query({
      query: (id) => (id ? `quiz/get/${id}` : `quiz/get/`),
    }),
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
  useLazyCheckAuthQuery,
  useGetAllQuestionsForModeQuery,
  useSendUserQuizMutation,
  useGetQuestionsOfQuizQuery,
  useGetQuizQuery,
  useLazyGetUserQuizzesForModeQuery,
} = apiService;
