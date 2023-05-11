"use client"

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { FullConversationType } from "@/types"
// import { Conversation, Message, User } from "@prisma/client"
import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"

import useOtherUser from "@/hooks/useOtherUser"
import AvatarIcon from "@/components/avatar-icon"
import AvatarIconGroup from "../avatar-icon-group"

interface ConversationBoxProps {
  data: FullConversationType
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push(`/conversation/${data.id}`)
  }, [data, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []

    return messages[messages.length - 1]
  }, [data.messages])

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  )

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image"
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return "Started a conversation"
  }, [lastMessage])

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 p-3 hover:bg-accent rounded-lg transition cursor-pointer`,
        selected ? "bg-accent" : "bg-background"
      )}
    >
      {data.isGroup ? ( <AvatarIconGroup users={data.users} /> ) : 
        ( <AvatarIcon currentUser={otherUser} /> 
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-medium text-primary">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-primary">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-primary font-light" : "text-primary font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox
