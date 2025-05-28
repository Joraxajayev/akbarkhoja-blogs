console.log("🔍 Environment Variables Check")
console.log("=============================")

const requiredVars = ["MONGODB_URI", "ADMIN_NAME", "ADMIN_EMAIL", "ADMIN_PASSWORD"]

let allSet = true

requiredVars.forEach((varName) => {
  const value = process.env[varName]
  const status = value ? "✅" : "❌"
  const display =
    varName === "MONGODB_URI" || varName === "ADMIN_PASSWORD" ? (value ? "***SET***" : "MISSING") : value || "MISSING"

  console.log(`${status} ${varName}: ${display}`)

  if (!value) allSet = false
})

console.log("")
if (allSet) {
  console.log("✅ All environment variables are set!")
} else {
  console.log("❌ Some environment variables are missing!")
  console.log("📝 Make sure to set all required variables in your .env file or Vercel dashboard")
}

console.log("")
console.log("🔗 MongoDB URI format should be:")
console.log("mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority")
