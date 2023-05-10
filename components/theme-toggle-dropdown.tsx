"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export function ThemeToggleDropdown() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenuItem
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icons.sun className="mr-2 h-4 w-4 scale-100 dark:scale-0" />
      <Icons.moon className="absolute mr-2 h-4 w-4 scale-0 dark:scale-100" />
      <span>Toggle theme</span>
    </DropdownMenuItem>
  )
}
