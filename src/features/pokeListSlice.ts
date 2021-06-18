import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    })
  })
})

export const { useGetPokemonByIdQuery, useGetPokemonListAllQuery } = pokemonApi;

export type PokeList = {
  list: {
    name: string;
    url: string;
  }[];
  status: 'loading' | 'idle' | 'failed' | 'success';
};

const initialState : PokeList = {
  list: [],
  status: 'idle'
};

export const getList = createAsyncThunk(
  'pokeList/getLIst',
  async () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999')
      .then((res) => res.json())
  }
)

const pokeListSlice = createSlice({
  name: 'pokeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getList.pending, 
        (state, action) => {  state.status = 'loading'}
      )
      .addCase(
        getList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.list = action.payload.results;
          state.status = 'success'
        }
      )
      .addCase(
        getList.rejected,
        (state, action) => {
          state.status = 'failed'
        }
      )
    }
});

export default pokeListSlice.reducer;