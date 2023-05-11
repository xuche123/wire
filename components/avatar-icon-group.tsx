"use client"

import { User } from "@prisma/client"
import { Users } from "lucide-react"

interface AvatarIconGroupProps {
  users: User[]
}
const AvatarIconGroup: React.FC<AvatarIconGroupProps> = ({ users }) => {
  return (
    <div className="avatar">
      <div className="w-10 rounded-full bg-black">
        <Users size={32} className="m-auto p-0 text-gray-400" />
      </div>
    </div>
  )
}

export default AvatarIconGroup
