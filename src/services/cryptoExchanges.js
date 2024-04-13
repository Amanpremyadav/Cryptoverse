import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangesApiHeaders = {
    'X-RapidAPI-Key': 'e8368fdd39msh9c5b171d725fa16p1f14fejsnb1b1da95bf79',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com', 
};

const baseUrl = "https://coingecko.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoExchangesApiHeaders });

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const {
    useGetExchangesQuery
} = cryptoExchangesApi;
