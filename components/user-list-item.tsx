"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import axios from "axios"

import AvatarIcon from "./avatar-icon"

interface UserListItemProps {
  item: User
}

const UserListItem: React.FC<UserListItemProps> = ({ item }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)
    axios
      .post("/api/conversation", {
        userId: item.id,
      })
      .then((data) => {
        router.push(`/conversation/${data.data.id}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [item.id, router])

  return (
    <div
      onClick={handleClick}
      className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-background p-3 transition hover:bg-accent"
    >
      <AvatarIcon currentUser={item} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-medium text-primary">{item.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserListItem
