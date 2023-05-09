import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { message, image, conversationId } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    })

    const updatedConversation = await db.conversation.update({
      where: {
       id: conversationId,
      },
      data: {
       lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
           seen: true,
         },
       },
     },
    })

    return NextResponse.json(newMessage)
  } catch (error : any) {
    console.log(error, "ERROR_MESSAGES")
    return new NextResponse("Error", { status: 500 })
  }
}