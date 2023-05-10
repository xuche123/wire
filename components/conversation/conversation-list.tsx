"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FullConversationType } from "@/types"
import clsx from "clsx"
import { MdOutlineGroupAdd } from "react-icons/md"

import useConversation from "@/hooks/useConversation"

import Logout from "../logout"
import ConversationListItem from "./conversation-list-item"
import { GroupModal } from "../modals/group-modal"
import { User } from "@prisma/client"

interface ConversationListProps {
  initialItems: FullConversationType[],
  users: User[]
}
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const [items, setItems] = useState(initialItems)
  // const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

  return (
    <>
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:w-80 lg:block overflow-y-auto border-r border-accent",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="">
          <div className="mb-4 flex justify-between pt-4">
            <div className="px-5 text-2xl font-bold text-primary">Messages</div>
            <div className="cursor-pointer rounded-full bg-background text-primary transition hover:opacity-75">
              <GroupModal users={users} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationListItem
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
          <div className="absolute bottom-0 hidden w-full items-center px-4 py-6 lg:flex">
            <Logout />
          </div>
        </div>
      </aside>
    </>
  )
}

export default ConversationList
