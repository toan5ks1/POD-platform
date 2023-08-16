/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { Button, Menu, MenuButton, Portal, useDisclosure } from '@chakra-ui/react';
import { useCallback } from "react"

import { type GoogleFont } from "@/types/google-font-type"
import useGetFontListQuery from "@/hooks/use-get-font-list-query"
import useStageObject from "@/hooks/use-stage-object"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import FontFamilyMenuList from "./FontFamilyMenuList"

type Props = {
  id: string
  fontFamily: string
}

const FontFamilyMenu = ({ id, fontFamily }: Props) => {
  const { updateOne } = useStageObject()
  const { fontList, isLoaded } = useGetFontListQuery()

  const handleMenuItemClick = useCallback(
    (font: GoogleFont) => {
      updateOne({
        id,
        data: {
          fontFamily: font.family,
          fontVariants: font.variants,
          webFont: true,
        },
      })
    },
    [id]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Sort products" size="sm">
          {fontFamily}
          <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem asChild>
          <FontFamilyMenuList
            fontList={fontList}
            isLoaded={isLoaded}
            handleMenuItemClick={handleMenuItemClick}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FontFamilyMenu
