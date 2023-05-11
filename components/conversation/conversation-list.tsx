"use client"

import { useMemo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FullConversationType } from "@/types"
import clsx from "clsx"

import useConversation from "@/hooks/useConversation"

import Logout from "../logout"
import ConversationListItem from "./conversation-list-item"
import { GroupModal } from "../modals/group-modal"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/lib/pusher"
import { find } from "lodash"

interface ConversationListProps {
  initialItems: FullConversationType[],
  users: User[]
}
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const [items, setItems] = useState(initialItems)
  const session = useSession()

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])
  

  useEffect(() => {
    if (!pusherKey) {
      return
    }

    const newConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      }) 
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => 
         current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages
            }
          }

          return currentConversation
        }))
    }
        

    pusherClient.subscribe(pusherKey)
    pusherClient.bind("conversation:new", newConversationHandler)
    pusherClient.bind("conversation:update", updateHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind("conversation:new", newConversationHandler)
      pusherClient.unbind("conversation:update", updateHandler)
    }
  })


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
