import React from "react"

import { Button } from "../ui/button"

interface AIPickerProps {
  type: string
  prompt: string
  setPrompt: (prompt: string) => void
  handleSubmit: (type: string) => void
}

const AIPicker: React.FC<AIPickerProps> = ({
  prompt,
  setPrompt,
  handleSubmit,
}) => {
  const generateStyle = () => {
    return {
      backgroundColor: "rgb(226, 232, 240)",
      opacity: "0.8",
      color: "rgb(75, 85, 99)",
      borderColor: "rgba(75, 85, 99, 0.2)",
    }
  }

  return (
    <div>
      <textarea
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={generateStyle()}
      />
      <div id="loading"></div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => handleSubmit("logo")}>
          AI Logo
          <span className="sr-only">AI Logo</span>
        </Button>
      </div>
    </div>
  )
}

export default AIPicker
