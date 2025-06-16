import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { cn } from "../../lib/utils"

interface MultiToggleGridProps {
  options: Array<{ value: string; label: string }>
  value: string[]
  onValueChange?: (value: string[]) => void
  className?: string
  disabled?: boolean
}

export const MultiToggleGrid: React.FC<MultiToggleGridProps> = ({
  options,
  value,
  onValueChange,
  className,
  disabled = false
}) => {
  return (
    <ToggleGroup
      type="multiple"
      value={value}
      onValueChange={onValueChange}
      className={cn("grid grid-cols-2 gap-2 w-full", className)}
      disabled={disabled}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          variant="outline"
          className="data-[state=on]:bg-blue-600 data-[state=on]:text-white border-gray-200 hover:border-gray-300"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}