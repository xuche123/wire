"use client"

import { useState } from "react"
import Image from "next/image"
import { FullMessageType } from "@/types"
import { format } from "date-fns"
import { useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import AvatarIcon from "@/components/avatar-icon"

interface MessageBoxProps {
  data: FullMessageType
  isLast?: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false)

  const isOwn = session.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ")

  return (
    <div
      className={cn("chat break-all", {
        "chat-start pl-2": !isOwn,
        "chat-end pr-2": isOwn,
      })}
      key={`${data.id}`}
    >
      <div className="chat-image avatar">
        <AvatarIcon currentUser={data.sender} />
      </div>
      <div className="chat-header">
        {isOwn ? "You" : data.sender.name}{" "}
        <time className="text-xs opacity-50">
          {format(new Date(data.createdAt), "p")}
        </time>
      </div>
      {data.image ? (
        <Image
          alt="Image"
          height="288"
          width="288"
          onClick={() => setImageModalOpen(true)}
          src={data.image}
          className="translate cursor-pointer rounded-md object-cover transition"
        />
      ) : (
        <div
          className={cn("chat-bubble", {
            "bg-accent text-accent-foreground": isOwn,
            "chat-bubble-primary": !isOwn,
          })}
        >
          {data.body}
        </div>
      )}
      {isLast && isOwn && seenList.length > 0 && (
        <div className="chat-footer opacity-50">{`Seen by ${seenList}`}</div>
      )}
    </div>
  )
}

export default MessageBox
