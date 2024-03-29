/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { type StageObject } from "@/types/stage-object"

import { type RootState } from "../store"

export const STAGE_OBJECT_SLICE = "stage"

export const stageObjectEntity = createEntityAdapter<StageObject>()

export const stageObjectSlice = createSlice({
  name: STAGE_OBJECT_SLICE,
  initialState: stageObjectEntity.setAll(
    stageObjectEntity.getInitialState(),
    []
  ),
  reducers: {
    addOne(state, { payload }) {
      stageObjectEntity.addOne(state, payload)
    },
    addMany(state, { payload }) {
      stageObjectEntity.addMany(state, payload)
    },
    updateOne(state, { payload }) {
      stageObjectEntity.updateOne(state, {
        id: payload.id,
        changes: payload,
      })
    },
    remove(state, { payload }) {
      if (Array.isArray(payload)) {
        stageObjectEntity.removeMany(state, payload)
        return
      }
      stageObjectEntity.removeOne(state, payload)
    },
    removeAll(state) {
      stageObjectEntity.removeAll(state)
    },
    replaceAll(state, { payload }) {
      stageObjectEntity.setAll(state, payload)
    },
  },
})

const stageObjectReducer = stageObjectSlice.reducer

export const stageObjectSelector = stageObjectEntity.getSelectors(
  (state: RootState) => state.stage
)

export const stateObjectActions = stageObjectSlice.actions
export default stageObjectReducer
