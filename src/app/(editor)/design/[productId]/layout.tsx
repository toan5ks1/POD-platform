"use client"

import { store } from "@/store/store"
import { Provider } from "react-redux"

interface DesignLayoutProps {
  children: React.ReactNode
}

export default function DesignLayout({ children }: DesignLayoutProps) {
  return <Provider store={store}>{children}</Provider>
}
