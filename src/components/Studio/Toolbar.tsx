"use client"

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type Konva from "konva"

import { TOOLBAR_TABS } from "@/config/components"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Export from "./tools/Export"
import HotkeysList from "./tools/Hotkeys/Hotkeys"
import Images from "./tools/Images/Images"
import ImageUpload from "./tools/ImageUpload/ImageUpload"
import Resize from "./tools/Resize"
import Texts from "./tools/Text/Texts"

type Props = {
  stageRef: React.RefObject<Konva.Stage>
}

const Toolbar = ({ stageRef }: Props) => {
  return (
    <Tabs id="toolbar" className="overflow-y-auto">
      <TabsList className="absolute right-0 flex h-full w-min flex-col gap-2">
        {TOOLBAR_TABS.map((tab, i) => (
          <TabsTrigger
            key={tab.title}
            value={i.toString()}
            className="flex items-center justify-center bg-background p-4 text-xs font-semibold shadow-sm hover:text-red-500 active:text-pink-500"
          >
            {/* {tab.title} */}
            {tab.icon}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={"0"}>
        <Resize />
      </TabsContent>
      <TabsContent value={"1"}>
        <Export stageRef={stageRef} />
      </TabsContent>
      <TabsContent value={"2"}>
        <Images />
      </TabsContent>
      <TabsContent value={"3"}>
        <ImageUpload />
      </TabsContent>
      <TabsContent value={"4"}>
        <Texts />
      </TabsContent>
      <TabsContent value={"5"}>
        <HotkeysList />
      </TabsContent>
    </Tabs>
  )
}

export default Toolbar
