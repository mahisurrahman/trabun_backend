const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
  if (db) return db;
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    return db;
  } catch (error) {
    console.error("MongoDB conenction failed!!", error);
    process.exit(1);
  }
}

module.exports = connectDB;
