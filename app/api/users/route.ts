import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const users = client.db("portfolio").collection("users")

    const allUsers = await users
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(allUsers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const client = await clientPromise
    const users = client.db("portfolio").collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email: body.email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 12)

    const newUser = {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role || "user",
      createdAt: new Date(),
    }

    const result = await users.insertOne(newUser)

    // Return user without password
    const { password, ...userWithoutPassword } = newUser
    return NextResponse.json({ id: result.insertedId, ...userWithoutPassword })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
