// import { Icon, IconButton, Menu, MenuButton, MenuList, Tooltip, Box } from '@chakra-ui/react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { TooltipContainer } from "@/components/shells/tooltip-shell"

import LetterSpacingSettings from "./LetterSpacingSettings"
import LineSpacingSettings from "./LineSpacingSetting"

type Props = {
  id: string
  letterSpacing: number
  lineHeight: number
}

const SpacingSettingsMenu = ({ id, letterSpacing, lineHeight }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Sort products" size="sm">
            <Icons.spacing className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 p-6">
          <DropdownMenuItem>
            <LetterSpacingSettings id={id} letterSpacing={letterSpacing} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LineSpacingSettings id={id} lineHeight={lineHeight} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SpacingSettingsMenu
