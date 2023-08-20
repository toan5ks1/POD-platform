/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env.mjs"
import { createApi } from "unsplash-js"

export const unsplash = createApi({
  accessKey: env.UNSPLASH_API_KEY,
})
