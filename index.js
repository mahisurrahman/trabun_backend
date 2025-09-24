require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is Connected to DB and running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to Connect to MONGODB", error.message);
    process.exit(1);
  }
}

main();
