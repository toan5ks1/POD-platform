"use client"

import { store } from "@/store/store"
import { Provider } from "react-redux"

import Studio from "@/components/Studio/Studio"

export default function DesignPage() {
  return (
    <Provider store={store}>
      <Studio />
    </Provider>
  )
}
