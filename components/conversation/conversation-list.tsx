"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FullConversationType } from "@/types"
import clsx from "clsx"
import { MdOutlineGroupAdd } from "react-icons/md"

import useConversation from "@/hooks/useConversation"

import { ThemeToggle } from "../theme-toggle"
import ConversationListItem from "./conversation-list-item"

interface ConversationListProps {
  initialItems: FullConversationType[]
}
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:w-80 lg:block overflow-y-auto border-r border-accent",
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="mb-4 flex justify-between pt-4">
          <div className="text-2xl font-bold text-primary">Messages</div>
          <ThemeToggle />

          <div className="cursor-pointer rounded-full bg-background p-2 text-primary transition hover:opacity-75">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationListItem
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  )
}

export default ConversationList
