"use client"

import React, { useState } from "react"
import { setSize } from "@/store/slices/frame-slice"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { useAppSelector } from "@/hooks/use-app-selector"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const sizes = [
  {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
  },
  {
    name: "Instagram Story",
    width: 1080,
    height: 1920,
  },
  {
    name: "Instagram Ad",
    width: 1080,
    height: 1080,
  },
  {
    name: "Instagram Avatar",
    width: 110,
    height: 110,
  },
  {
    name: "Facebook Post",
    width: 940,
    height: 788,
  },
  {
    name: "Facebook Cover",
    width: 851,
    height: 315,
  },
  {
    name: "Facebook Ad",
    width: 1200,
    height: 628,
  },
  {
    name: "Facebook Avatar",
    width: 180,
    height: 180,
  },
  {
    name: "Twitter Post",
    width: 900,
    height: 450,
  },
  {
    name: "Twitter Header",
    width: 1500,
    height: 500,
  },
  {
    name: "Twitter Avatar",
    width: 400,
    height: 400,
  },
  {
    name: "Youtube Thumbnail",
    width: 1280,
    height: 720,
  },
  {
    name: "Youtube Channel Cover",
    width: 2560,
    height: 1440,
  },
  {
    name: "Youtube Channel Icon",
    width: 800,
    height: 800,
  },
  {
    name: "LinkedIn Avatar",
    width: 400,
    height: 400,
  },
  {
    name: "LinkedIn Cover",
    width: 1584,
    height: 396,
  },
  {
    name: "A4",
    width: 2480,
    height: 3508,
  },
]

const Resize = () => {
  const dispatch = useDispatch()
  const form = useForm<{ email: string }>({
    // resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  })
  const { width: frameWidth, height: frameHight } = useAppSelector(
    (state) => state.frame
  )
  const [width, setWidth] = useState<string>(`${frameWidth}`)
  const [height, setHeight] = useState<string>(`${frameHight}`)

  const handleChangeWidth = (event: React.SyntheticEvent) => {
    const w = (event.target as HTMLInputElement).value
    setWidth(w)
  }

  const handleChangeHeight = (event: React.SyntheticEvent) => {
    const h = (event.target as HTMLInputElement).value
    setHeight(h)
  }

  const checkInput = (input: number) => {
    if (input < 10) {
      input = 10
    } else if (input > 10000) {
      input = 10000
    }
    return input
  }

  const handleBlurWidth = (event: React.SyntheticEvent) => {
    let w = Number((event.target as HTMLInputElement).value)
    w = checkInput(w)
    setWidth(`${w}`)
    dispatch(
      setSize({
        width: w,
        height: frameHight,
      })
    )
  }

  const handleBlurHeight = (event: React.SyntheticEvent) => {
    let h = Number((event.target as HTMLInputElement).value)
    h = checkInput(h)
    setHeight(`${h}`)
    dispatch(
      setSize({
        width: frameWidth,
        height: h,
      })
    )
  }

  const handleResize = (index: number) => {
    setWidth(`${sizes[index]?.width}`)
    setHeight(`${sizes[index]?.height}`)

    dispatch(
      setSize({
        width: sizes[index]?.width,
        height: sizes[index]?.height,
      })
    )
  }

  return (
    <div className="mb-4 flex space-x-4">
      <Form {...form}>
        <form>
          <FormControl className="flex justify-between">
            <FormLabel htmlFor="width" className="my-2">
              Width (px)
            </FormLabel>
            <Input
              id="width"
              placeholder="width"
              type="number"
              width="100px"
              value={width}
              onChange={handleChangeWidth}
              onBlur={handleBlurWidth}
            />
          </FormControl>

          <FormControl className="flex justify-between">
            <FormLabel htmlFor="height" className="my-2">
              Height (px)
            </FormLabel>
            <Input
              id="height"
              placeholder="height"
              type="number"
              value={height}
              width="100px"
              onChange={handleChangeHeight}
              onBlur={handleBlurHeight}
            />
          </FormControl>

          {sizes.map((size, index) => (
            <Button
              key={index}
              onClick={() => {
                handleResize(index)
              }}
              size="sm"
              className="w-full"
            >
              {size.name} {size.width} x {size.height} px
            </Button>
          ))}
        </form>
      </Form>
    </div>
  )
}

export default Resize
