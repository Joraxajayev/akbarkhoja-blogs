const bcrypt = require("bcryptjs")
const { MongoClient } = require("mongodb")

const MONGODB_URI = process.env.MONGODB_URI
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

async function testAdmin() {
  console.log("🧪 Testing Admin User Authentication")
  console.log("===================================")

  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("❌ Missing environment variables!")
    return
  }

  const client = new MongoClient(MONGODB_URI)

  try {
    console.log("📡 Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected successfully!")

    const db = client.db("portfolio")
    const users = db.collection("users")

    // Check if user exists
    console.log("🔍 Looking for admin user...")
    const user = await users.findOne({ email: ADMIN_EMAIL })

    if (!user) {
      console.log("❌ Admin user not found!")
      console.log("📧 Looking for email:", ADMIN_EMAIL)

      // Show all users
      const allUsers = await users.find({}).toArray()
      console.log("📋 All users in database:")
      allUsers.forEach((u) => {
        console.log(`  - Email: ${u.email}, Role: ${u.role}, Created: ${u.createdAt}`)
      })
      return
    }

    console.log("✅ Admin user found!")
    console.log("📧 Email:", user.email)
    console.log("👤 Name:", user.name)
    console.log("🔑 Role:", user.role)
    console.log("📅 Created:", user.createdAt)
    console.log("🔐 Has password:", !!user.password)

    // Test password
    console.log("🔐 Testing password...")
    const isPasswordValid = await bcrypt.compare(ADMIN_PASSWORD, user.password)
    console.log("🔐 Password test result:", isPasswordValid ? "✅ VALID" : "❌ INVALID")

    if (!isPasswordValid) {
      console.log("🔧 Password mismatch detected!")
      console.log("💡 This could be because:")
      console.log("1. The ADMIN_PASSWORD environment variable is different from when user was created")
      console.log("2. The password was not hashed correctly")
      console.log("3. There's a character encoding issue")

      console.log("🛠️  Let's recreate the user with current password...")

      // Delete existing user
      await users.deleteOne({ email: ADMIN_EMAIL })
      console.log("🗑️  Deleted existing user")

      // Create new user with current password
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12)
      const result = await users.insertOne({
        name: process.env.ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
      })

      console.log("✅ Recreated admin user with ID:", result.insertedId)
      console.log("🔐 Password should now work!")
    }
  } catch (error) {
    console.error("💥 Error:", error.message)
  } finally {
    await client.close()
    console.log("🔌 Connection closed")
  }
}

testAdmin().catch(console.error)
