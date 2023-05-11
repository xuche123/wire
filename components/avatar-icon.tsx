"use client"

import useActiveList from "@/hooks/useActiveList"
import { User } from "@prisma/client"
import clsx from "clsx"

import Image from "next/image"

interface AvartarProps {
  currentUser: User
}

const AvatarIcon: React.FC<AvartarProps> = ({ currentUser }) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(currentUser?.email!) !== -1

  
  if (currentUser.image) {
    return (
      <div className={clsx("avatar", isActive && "online")}>
        <div className="w-10 rounded">
          <Image src={currentUser.image} alt="img" />
        </div>
      </div>
    )
  }

  return (
    <div className={clsx("placeholder avatar", isActive && "online")}>
      <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
        <span className="text-xl">{currentUser.name?.slice(0, 2).toUpperCase()}</span>
      </div>
    </div> 
  )
}

export default AvatarIcon
