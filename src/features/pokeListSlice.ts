import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Pokemon {
  id: number;
  name: number;
  primaryType: string;
  secondaryType: string;
  abilities: {
    isHidden: boolean;
    slot: number;
    ability: string;
  }[];
}