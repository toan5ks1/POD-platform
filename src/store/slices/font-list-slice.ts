/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env.mjs"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { type GoogleFont } from "@/types/google-font-type"
import { GOOGLE_FONTS_API_URL } from "@/config/fonts"

export const fetchFontList = createAsyncThunk(
  "fontList/fetchFontListStatus",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${GOOGLE_FONTS_API_URL}webfonts/v1/webfonts?key=${env.GOOGLE_FONTS_API_KEY}&sort=alpha&subset=latin`
      )
      const data = await response.json()
      return data.items
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

type FontListState = {
  fontList: GoogleFont[]
  loading: "idle" | "pending" | "succeeded" | "failed"
}

const initialState: FontListState = {
  fontList: [],
  loading: "idle",
}

const fontListSlice = createSlice({
  name: "fontList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFontList.fulfilled, (state, action) => {
        state.fontList = action.payload
        state.loading = "succeeded"
      })
      .addCase(fetchFontList.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(fetchFontList.rejected, (state) => {
        state.loading = "failed"
      })
  },
})

export default fontListSlice.reducer
