"use client"

import { useState } from "react"
import { LogOut, Settings } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ThemeToggleDropdown } from "./theme-toggle-dropdown"

const Logout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const session = useSession()
  // console.log(session)
  const handleClick = () => {
    // console.log("clicked")
    signOut()
  }

  return (
    <nav className="flex w-full flex-row items-center justify-between">
      <div className="font-bold">{session.data?.user?.name}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Settings size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ThemeToggleDropdown />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleClick}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
export default Logout
