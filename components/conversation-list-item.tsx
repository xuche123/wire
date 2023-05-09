"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { FullConversationType } from "@/types"
import { Conversation, Message, User } from "@prisma/client"
import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"

import useOtherUser from "@/hooks/useOtherUser"

import AvatarIcon from "./avatar-icon"

interface ConversationListItemProps {
  item: FullConversationType
  selected: boolean
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({
  item,
  selected,
}) => {
  const router = useRouter()
  const session = useSession()
  const otherUser = useOtherUser(item)

  const handleClick = useCallback(() => {
    router.push(`/conversation/${item.id}`)
  }, [item.id, router])

  const lastMessage = useMemo(() => {
    const messages = item.messages || []
    return messages[messages.length - 1]
  }, [item.messages])

  const email = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false

    const seenArray = lastMessage.seen || []

    if (!email) return false

    return seenArray.filter((user) => user.email === email).length > 0
  }, [email, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image"
    }

    if (lastMessage?.body) {
      return lastMessage.body
    }

    return "Start a conversation"
  }, [lastMessage])
  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 p-3 hover:bg-accent rounded-lg transition cursor-pointer`,
        selected ? "bg-neutral-100" : "bg-background"
      )}
    >
      {/* {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
      )} */}
      <AvatarIcon currentUser={otherUser} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-medium text-primary">
              {item.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-accent">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-accent" : "text-primary font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationListItem
