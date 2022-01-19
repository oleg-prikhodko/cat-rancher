import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCat, deleteCat, getCat, getCats, updateCat } from "./api";
import { Cat } from "./types";
import { RootState } from "./store";

const initialState = {
  byId: {} as Record<number, Cat>,
  ids: [] as number[],
};

export const getCatsThunk = createAsyncThunk("cats/get", getCats);
export const getCatByIdThunk = createAsyncThunk("cats/getById", getCat);
export const createCatThunk = createAsyncThunk("cats/create", createCat);
export const deleteCatThunk = createAsyncThunk("cats/delete", deleteCat);
export const updateCatThunk = createAsyncThunk("cats/update", updateCat);

const slice = createSlice({
  name: "cats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCatsThunk.fulfilled, (state, action) => {
        state.ids = action.payload.map((cat) => cat.id);
        state.byId = action.payload;
        state.byId = action.payload.reduce((acc, cat) => {
          acc[cat.id] = cat;
          return acc;
        }, {} as Record<number, Cat>);
      })
      .addCase(getCatByIdThunk.fulfilled, (state, action) => {
        const cat = action.payload;
        state.byId[cat.id] = cat;
      });
  },
});

export default slice.reducer;

export const selectCats = (state: RootState) =>
  state.cats.ids.map((id) => state.cats.byId[id]);

export const selectCatById = (id: number) => (state: RootState) =>
  state.cats.byId[id];
