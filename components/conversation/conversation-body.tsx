"use client"

import { useEffect, useRef, useState } from "react"
import { FullMessageType } from "@/types"
import { pusherClient } from "@/lib/pusher"
import axios from "axios"

import useConversation from "@/hooks/useConversation"

import MessageItem from "../message-item"
import { find } from "lodash"

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages)

  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    
    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        // if message already exists, don't add it
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      axios.post(`/api/conversation/${conversationId}/seen`)
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)
    
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
    
  }, [conversationId, messages])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageItem
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body
