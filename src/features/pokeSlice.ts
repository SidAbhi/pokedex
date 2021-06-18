import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/'}),
  endpoints: (builder) => ({
    getPokemonListAll: builder.query({
      query: (offset) => `pokemon?offset=0&limit=${offset}`
    }),
    getPokemonById: builder.query({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonSpecies: builder.query({
      query: (id) => `pokemon-species/${id}`
    })
  })
})

export const { useGetPokemonByIdQuery, useGetPokemonListAllQuery, useGetPokemonSpeciesQuery } = pokemonApi;