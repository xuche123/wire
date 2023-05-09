"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Conversation, User } from "@prisma/client"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"

import useOtherUser from "@/hooks/useOtherUser"

import AvatarIcon from "../avatar-icon"

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }
    return "Active"
  }, [conversation])

  return (
    <div className="flex w-full items-center justify-between border-b-[1px] bg-background px-4 py-3 shadow-sm sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          href="/conversation"
          className="block cursor-pointer text-primary transition hover:text-destructive lg:hidden"
        >
          <HiChevronLeft size={32} />
        </Link>
        <AvatarIcon currentUser={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="cursor-pointer text-primary transition hover:text-destructive"
      />
    </div>
  )
}

export default Header
