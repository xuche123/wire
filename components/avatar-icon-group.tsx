"use client"

import { User } from "@prisma/client"

interface AvatarIconGroupProps {
  users: User[]
}
const AvatarIconGroup:React.FC<AvatarIconGroupProps> = ({users}) => {
  return (
    <div>Group</div>
  )
}

export default AvatarIconGroup