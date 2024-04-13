import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createRequest = (url) => ({ url});
const baseUrl = 'https://newsapi.org';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl}),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count, currentDate }) => createRequest(`/v2/everything?q=${newsCategory}&from=${currentDate}&pageSize=${count}&sortBy=popularity&apiKey=e75cb2b09cac46fdbeb89dcc9010c140`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;