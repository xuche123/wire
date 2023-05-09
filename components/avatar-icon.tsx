"use client"

import { User } from "@prisma/client"
import { Avatar, AvatarImage, AvatarFallback  } from "./ui/avatar"

interface AvartarProps {
  currentUser : User
}

const AvatarIcon: React.FC<AvartarProps> = ({ currentUser }) => {
  // console.log(currentUser.name)
  return (
    <Avatar>
      <AvatarImage src={currentUser.image!} alt="img" />
      {/* <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3"/> */}
      <AvatarFallback>{currentUser.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarIcon