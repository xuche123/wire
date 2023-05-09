import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      console.log("session.ts 1")
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      console.log("session.ts 2")
      return null
    }

    return currentUser
  } catch (error: any) {
    console.log(3)
    return null
  }

  // const session = await getServerSession(authOptions)
  // return session?.user
}
