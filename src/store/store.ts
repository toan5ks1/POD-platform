/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { apiSlice } from "./api/api-slice"
import authReducer from "./slices/auth-slice"
import copiedObjectReducer from "./slices/copied-objects-slice"
import fontListReducer from "./slices/font-list-slice"
import frameReducer from "./slices/frame-slice"
import selectedObjectReducer from "./slices/selected-objects-slice"
import stageObjectReducer from "./slices/stage-object-slice"

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["selected", "fontList", "copied", "api"],
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    frame: frameReducer,
    stage: stageObjectReducer,
    selected: selectedObjectReducer,
    auth: authReducer,
    fontList: fontListReducer,
    copied: copiedObjectReducer,
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // immutableCheck: { warnAfter: 128 },
      immutableCheck: false,
    }).concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
