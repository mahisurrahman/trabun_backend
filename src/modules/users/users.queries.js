require("dotenv").config();
const connectDB = require("../../config/db");

const createUser = async (userData) => {
  const { username, email, password, traId, designation } = userData;

  const db = await connectDB();
  const user = await db.collection("users").findOne({ username, email });
  if (user) {
    return { error: true, data: null, errorMessage: "User already exists" };
  }
  const newUser = await db.collection("users").insertOne({
    username,
    email,
    password,
    traId,
    designation,
    status: true,
    isActive: true,
    isDelete: false,
    createAt: new Date(),
    updateAt: null,
  });

  if (newUser.acknowledged) {
    const resultData = {
      _id: newUser.insertedId,
      ...userData,
    };
    return {
      error: false,
      data: resultData,
      errorMessage: "Successfully Created User",
    };
  } else {
    return { error: true, data: null, errorMessage: "Failed to Create User" };
  }
};

const getAllUser = async () => {
  const db = await connectDB();

  const userList = await db.collection("users").find();
  return { error: false, data: resultData, errorMessage: "" };
};

module.exports = {
  createUser,
};
