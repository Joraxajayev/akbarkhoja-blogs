require("dotenv").config()
const bcrypt = require("bcryptjs")
const { MongoClient } = require("mongodb")

async function updatePassword() {
  console.log("🔄 Updating Admin Password")
  console.log("==========================")

  const uri = process.env.MONGODB_URI
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!uri || !adminEmail || !adminPassword) {
    console.error("❌ Missing environment variables!")
    console.log("Required: MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD")
    return
  }

  console.log("📧 Admin Email:", adminEmail)
  console.log("🔐 New Password:", adminPassword ? "***SET***" : "MISSING")

  const client = new MongoClient(uri)

  try {
    console.log("📡 Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected successfully!")

    const users = client.db("portfolio").collection("users")

    // Check if user exists first
    const existingUser = await users.findOne({ email: adminEmail })
    if (!existingUser) {
      console.log("❌ User not found with email:", adminEmail)

      // Show all users
      const allUsers = await users.find({}).toArray()
      console.log("📋 All users in database:")
      allUsers.forEach((u) => {
        console.log(`  - ${u.email} (${u.role})`)
      })
      return
    }

    console.log("✅ User found:", existingUser.name)

    // Hash new password
    console.log("🔐 Hashing new password...")
    const newHashed = await bcrypt.hash(adminPassword, 12)

    // Update password
    console.log("💾 Updating password in database...")
    const result = await users.updateOne(
      { email: adminEmail },
      {
        $set: {
          password: newHashed,
          updatedAt: new Date(),
        },
      },
    )

    if (result.modifiedCount > 0) {
      console.log("🎉 Password updated successfully!")
      console.log("📧 Email:", adminEmail)
      console.log("📊 Modified documents:", result.modifiedCount)

      // Test the new password
      console.log("🧪 Testing new password...")
      const isValid = await bcrypt.compare(adminPassword, newHashed)
      console.log("✅ Password test:", isValid ? "PASSED" : "FAILED")
    } else {
      console.log("⚠️  No documents were modified")
    }
  } catch (error) {
    console.error("💥 Error updating password:", error.message)
  } finally {
    console.log("🔌 Closing connection...")
    await client.close()
    console.log("✅ Connection closed")
  }
}

updatePassword().catch(console.error)
