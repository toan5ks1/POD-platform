/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { type StageObject } from "@/types/stage-object"

import { type RootState } from "../store"

export const COPIED_OBJECT_SLICE = "copied"

export const copiedObjectEntity = createEntityAdapter<StageObject>()

export const copiedObjectSlice = createSlice({
  name: COPIED_OBJECT_SLICE,
  initialState: copiedObjectEntity.setAll(
    copiedObjectEntity.getInitialState(),
    []
  ),
  reducers: {
    setAll(state, { payload }) {
      copiedObjectEntity.setAll(state, payload)
    },
  },
})

const copiedObjectReducer = copiedObjectSlice.reducer

export const copiedObjectSelector = copiedObjectEntity.getSelectors(
  (state: RootState) => state.copied
)

export const copiedObjectActions = copiedObjectSlice.actions
export default copiedObjectReducer
