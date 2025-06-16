import * as React from "react"
import { cn } from "../../lib/utils"

interface FormatToggleProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

export const FormatToggle: React.FC<FormatToggleProps> = ({
  value,
  onValueChange,
  className,
  disabled = false
}) => {
  const options = [
    { value: "leilao", label: "Leilão" },
    { value: "venda-direta", label: "Venda Direta" }
  ]

  const handleSelect = (optionValue: string) => {
    if (value === optionValue) {
      onValueChange?.("") // Deselect if clicking the same option
    } else {
      onValueChange?.(optionValue)
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-sm font-medium text-gray-700 mb-4">
        Formato
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = value === option.value
          
          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              disabled={disabled}
              className={cn(
                "relative p-4 rounded-xl border text-center transition-all duration-200 active:scale-[0.98]",
                isSelected
                  ? "border-blue-500 bg-blue-50 text-blue-900 shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="font-semibold text-sm">
                {option.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}