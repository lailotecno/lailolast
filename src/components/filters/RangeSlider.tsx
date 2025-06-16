import * as React from "react"
import { Slider } from "../ui/slider"
import { Input } from "../ui/input"
import { cn } from "../../lib/utils"

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  prefix?: string
  suffix?: string
  className?: string
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  prefix = "",
  suffix = "",
  className
}) => {
  const handleInputChange = (index: 0 | 1, inputValue: string) => {
    const numValue = parseFloat(inputValue) || 0
    const clampedValue = Math.max(min, Math.min(max, numValue))
    const newValue: [number, number] = [...value]
    newValue[index] = clampedValue
    
    // Ensure min <= max
    if (index === 0 && newValue[0] > newValue[1]) {
      newValue[1] = newValue[0]
    } else if (index === 1 && newValue[1] < newValue[0]) {
      newValue[0] = newValue[1]
    }
    
    onValueChange(newValue)
  }

  const formatValue = (val: number) => {
    return `${prefix}${val.toLocaleString('pt-BR')}${suffix}`
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        className="w-full"
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {prefix}
            </span>
          )}
          <Input
            type="number"
            value={value[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            min={min}
            max={max}
            className={cn("border-gray-200 rounded-xl", prefix && "pl-8", suffix && "pr-8")}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {suffix}
            </span>
          )}
        </div>
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {prefix}
            </span>
          )}
          <Input
            type="number"
            value={value[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            min={min}
            max={max}
            className={cn("border-gray-200 rounded-xl", prefix && "pl-8", suffix && "pr-8")}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}