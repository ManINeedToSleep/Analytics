/**
 * @file combobox.tsx
 * @description Hybrid searchbar/dropdown component for selecting items with search functionality.
 * Perfect for community selection with creator information and duplicate handling.
 */
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface ComboboxOption {
  value: string
  label: string
  creator?: string
  createdDate?: string
  members?: number
  description?: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
  showCreator?: boolean
  showMemberCount?: boolean
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  className,
  disabled = false,
  showCreator = true,
  showMemberCount = true,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const selectedOption = options.find((option) => option.value === value)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
    (option.creator && option.creator.toLowerCase().includes(searchValue.toLowerCase()))
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white",
            !selectedOption && "text-neutral-500",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 opacity-50" />
            {selectedOption ? (
              <div className="flex items-center gap-2">
                <span>{selectedOption.label}</span>
                {showCreator && selectedOption.creator && (
                  <span className="text-xs text-neutral-400">
                    by {selectedOption.creator}
                  </span>
                )}
              </div>
            ) : (
              placeholder
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-neutral-800 border-neutral-700">
        <Command className="bg-neutral-800">
          <CommandInput 
            placeholder={searchPlaceholder} 
            value={searchValue}
            onValueChange={setSearchValue}
            className="text-neutral-200"
          />
          <CommandList>
            <CommandEmpty className="text-neutral-400 py-6 text-center text-sm">
              {emptyText}
            </CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setSearchValue("")
                  }}
                  className="text-neutral-200 hover:bg-neutral-700 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          value === option.value ? "opacity-100 text-purple-400" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        {showCreator && option.creator && (
                          <span className="text-xs text-neutral-400">
                            Created by {option.creator}
                            {option.createdDate && ` on ${option.createdDate}`}
                          </span>
                        )}
                        {option.description && (
                          <span className="text-xs text-neutral-500 mt-1">
                            {option.description}
                          </span>
                        )}
                      </div>
                    </div>
                    {showMemberCount && option.members !== undefined && (
                      <div className="text-xs text-neutral-400">
                        {option.members.toLocaleString()} members
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 