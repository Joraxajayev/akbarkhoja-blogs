require("dotenv").config();
const bcrypt = require("bcryptjs")
const { MongoClient } = require("mongodb")

// Get environment variables
const MONGODB_URI = process.env.MONGODB_URI
const ADMIN_NAME = process.env.ADMIN_NAME
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

async function createAdmin() {
  console.log("🎯 Portfolio Admin User Creator")
  console.log("================================")
  console.log("🔗 Using MongoDB URI:", MONGODB_URI ? "✅ Set" : "❌ Missing")
  console.log("👤 Admin Name:", ADMIN_NAME || "❌ Missing")
  console.log("📧 Admin Email:", ADMIN_EMAIL || "❌ Missing")
  console.log("🔑 Admin Password:", ADMIN_PASSWORD ? "✅ Set" : "❌ Missing")
  console.log("")

  if (!MONGODB_URI || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("❌ Missing required environment variables!")
    console.log("📝 Make sure these are set:")
    console.log("- MONGODB_URI")
    console.log("- ADMIN_NAME")
    console.log("- ADMIN_EMAIL")
    console.log("- ADMIN_PASSWORD")
    return
  }

  const client = new MongoClient(MONGODB_URI)

  try {
    // Connect to MongoDB
    console.log("📡 Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected to MongoDB successfully!")

    const db = client.db("portfolio")
    const users = db.collection("users")

    // Check if admin already exists
    console.log("🔍 Checking if admin user already exists...")
    const existingAdmin = await users.findOne({ email: ADMIN_EMAIL })

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists!")
      console.log("📧 Email:", existingAdmin.email)
      console.log("👤 Name:", existingAdmin.name)
      console.log("🔑 Role:", existingAdmin.role)
      console.log("📅 Created:", existingAdmin.createdAt)
      console.log("")
      console.log("🔗 You can login at: /auth/signin")
      return
    }

    // Hash the password
    console.log("🔐 Hashing password...")
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12)

    // Create admin user
    console.log("👤 Creating admin user...")
    const result = await users.insertOne({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    })

    console.log("🎉 Admin user created successfully!")
    console.log("📧 Email:", ADMIN_EMAIL)
    console.log("👤 Name:", ADMIN_NAME)
    console.log("🆔 User ID:", result.insertedId)
    console.log("📅 Created:", new Date().toISOString())
    console.log("")
    console.log("🔗 Login URL: /auth/signin")
    console.log("")
    console.log("✅ Setup complete! You can now:")
    console.log("1. Go to your portfolio website")
    console.log("2. Navigate to /auth/signin")
    console.log("3. Login with your admin credentials")
    console.log("4. Access the admin panel at /admin")
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message)

    if (error.message.includes("authentication failed")) {
      console.log("")
      console.log("🔧 Authentication failed - Check:")
      console.log("1. MongoDB username and password in connection string")
      console.log("2. IP whitelist in MongoDB Atlas (allow 0.0.0.0/0)")
      console.log("3. Database user permissions (read/write access)")
    }

    if (error.message.includes("ENOTFOUND")) {
      console.log("")
      console.log("🔧 Network issue - Check:")
      console.log("1. Internet connection")
      console.log("2. MongoDB cluster URL is correct")
      console.log("3. MongoDB Atlas service status")
    }

    if (error.message.includes("MongoServerError")) {
      console.log("")
      console.log("🔧 Database error - Check:")
      console.log("1. Database name in connection string")
      console.log("2. Collection permissions")
      console.log("3. MongoDB Atlas cluster status")
    }
  } finally {
    console.log("")
    console.log("🔌 Closing database connection...")
    await client.close()
    console.log("✅ Connection closed.")
  }
}

// Run the script
createAdmin().catch((error) => {
  console.error("💥 Unexpected error:", error)
})
