"use client"

import { User } from "@prisma/client"

import Image from "next/image"

interface AvartarProps {
  currentUser: User
}

const AvatarIcon: React.FC<AvartarProps> = ({ currentUser }) => {
  if (currentUser.image) {
    return (
      <div className="avatar">
        <div className="w-12 rounded">
          <Image src={currentUser.image} alt="img" />
        </div>
      </div>
    )
  }

  return (
    <div className="placeholder online avatar">
      <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
        <span className="text-xl">{currentUser.name?.slice(0, 2).toUpperCase()}</span>
      </div>
    </div> 
  )
}

export default AvatarIcon
