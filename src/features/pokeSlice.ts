import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export type Pokemon = {
  id: number,
  name: string,
  abilities: {
    name: string,
    url: string,
    isHidden: boolean,
    slot: number
  },
  sprites: {
    frontM: string,
    frontMShiny: string,
    frontF: string | null | undefined,
    frontFShiny: string | null | undefined,
    hqArt: string,
    hqArtCompressed: string,
    hqArtThumbnail: string,
    hqArtThumbnailCompressed: string,
  }
  stats: {
    hp: number,
    atk: number,
    def: number,
    spa: number,
    spd: number,
    spe: number,
  },
  primaryType: string,
  secondaryType: string,
  weight: number
}

export const { useGetPokemonByIdQuery, useGetPokemonListAllQuery, useGetPokemonSpeciesQuery } = pokemonApi;