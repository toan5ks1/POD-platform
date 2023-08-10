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
    <div className="flex h-screen border-r-2 border-gray-200">
      <Tabs className="h-full overflow-x-auto px-8" orientation="vertical">
        <TabsList>
          {TOOLBAR_TABS.map((tab, i) => (
            <TabsTrigger
              key={tab.title}
              value={i.toString()}
              className="selected:bg-white selected:text-pink-500 flex items-center justify-center bg-background p-4 text-xs font-semibold text-foreground shadow-sm hover:text-pink-500"
            >
              {tab.title}
              {tab.icon}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* <div className="px-4 pb-2 pt-3"> */}
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
        {/* </div> */}
      </Tabs>
    </div>
  )
}

export default Toolbar
