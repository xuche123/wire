import { db } from "./db"
import { getCurrentUser } from "./session"

const getUsers = async () => {
  const user = await getCurrentUser()

  if (!user) {
    console.log(1)
    return []
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: user.email,
        }
      }
    })
    return users
  } catch (errors: any) {
    console.log(2)
    return []
  }
}

export default getUsers