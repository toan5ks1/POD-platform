/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from "@reduxjs/toolkit"

import { type StageObject } from "@/types/stage-object"

export type IStageState = {
  id: string | null
  name: string | null
  description: string | null
  content?: string | StageObject[] | null
}

export type IFrameState = {
  stage: IStageState
  width: number
  height: number
  scale: number
}

const initialState: IFrameState = {
  stage: {
    id: null,
    name: null,
    description: null,
    content: null,
  },
  width: 4000,
  height: 4000,
  scale: 10,
}

const frameSlice = createSlice({
  name: "frame",
  initialState,
  reducers: {
    setStage(state, { payload }) {
      state.stage.id = payload.id
      state.stage.name = payload.name || null
      state.stage.description = payload.description || null
      state.stage.content = payload.content || []
    },
    resetStage(state) {
      state.stage.id = null
      state.stage.name = null
      state.stage.description = null
      state.stage.content = null
    },
    setSize(state, { payload }) {
      state.width = payload.width
      state.height = payload.height
    },
    setScale(state, { payload }) {
      state.scale = payload.scale
    },
  },
})

export const { setSize, setScale, setStage, resetStage } = frameSlice.actions
export default frameSlice.reducer
