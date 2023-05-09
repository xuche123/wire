"use client"
import { User } from "@prisma/client"
import { useState } from "react"
import AvatarIcon from "./avatar-icon"

interface LogoutProps {
  currentUser: User
}

const Logout: React.FC<LogoutProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="mt-4 flex flex-col items-center justify-between">
      <div onClick={() => setIsOpen(true)} className="cursor-pointer transition hover:opacity-75">
        <AvatarIcon currentUser={currentUser} />
      </div>
    </nav>
  )
}
export default Logout