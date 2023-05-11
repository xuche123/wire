import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { getCurrentUser } from "@/lib/session"

interface IParams {
  conversationId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    })

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversation.id,
      messages: [updatedMessage],
    })

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation)
    }

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    )

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_SEEN")
    return new NextResponse("Error", { status: 500 })
  }
}
