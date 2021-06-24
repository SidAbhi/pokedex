import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/'}),
  endpoints: (builder) => ({
    getPokemonListAll: builder.query({
      query: (prop) => `pokemon-species/?offset=${prop.offset}&limit=${prop.limit}`
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