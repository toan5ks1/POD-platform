/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react"
import { fetchFontList } from "@/store/slices/font-list-slice"
import { type ThunkDispatch } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import { useAppSelector } from "./use-app-selector"

const useGetFontListQuery = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const { fontList, loading } = useAppSelector((state) => state.fontList)

  useEffect(() => {
    if (loading === "succeeded" && fontList.length > 0) {
      setIsLoaded(true)
      return
    }
    void dispatch(fetchFontList())
    setIsLoaded(false)
  }, [loading])

  return { fontList, isLoaded }
}

export default useGetFontListQuery
