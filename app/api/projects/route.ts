import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const projects = client.db("portfolio").collection("projects")

    const allProjects = await projects.find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(allProjects)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
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
    const projects = client.db("portfolio").collection("projects")

    const newProject = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await projects.insertOne(newProject)

    return NextResponse.json({ id: result.insertedId, ...newProject })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
