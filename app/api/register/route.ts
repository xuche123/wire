import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json()

    if (!email || !name || !password) {
      return new Response("Missing fields", { status: 400 })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword: hash,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.log(error)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
