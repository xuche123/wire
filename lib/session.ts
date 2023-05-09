import { getServerSession } from "next-auth/next"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      console.log(1)
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!currentUser) {
      console.log(2)
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
