import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import clientPromise from "./mongodb"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Auth attempt for:", credentials?.email)

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials")
          return null
        }

        try {
          console.log("📡 Connecting to MongoDB...")
          const client = await clientPromise
          const users = client.db("portfolio").collection("users")

          console.log("🔍 Looking for user with email:", credentials.email)
          const user = await users.findOne({ email: credentials.email })

          if (!user) {
            console.log("❌ User not found in database")
            // Show available users for debugging
            const allUsers = await users.find({}).toArray()
            console.log(
              "📋 Available users:",
              allUsers.map((u) => u.email),
            )
            return null
          }

          console.log("✅ User found:", {
            email: user.email,
            role: user.role,
            hasPassword: !!user.password,
          })

          console.log("🔐 Comparing passwords...")
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          console.log("🔐 Password valid:", isPasswordValid)

          if (!isPasswordValid) {
            console.log("❌ Invalid password for user:", credentials.email)
            return null
          }

          console.log("✅ Authentication successful for:", user.email)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("💥 Auth error:", error)
          return null
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("🎫 Creating JWT for user:", user.email)
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        console.log("📋 Session created for:", session.user.email, "Role:", session.user.role)
      }
      return session
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
}
