require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");

const createUser = async (userData) => {
  const { username, email, password, traId, designation, userType } = userData;

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
    userType,
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

  const userList = await db
    .collection("users")
    .find()
    .sort({ createdAt: 1 })
    .toArray();
  return userList;
};

const getUserInfoById = async (id) => {
  const db = await connectDB();

  const userInfo = await db
    .collection("users")
    .findOne({ _id: new ObjectId(id), isActive: true, isDelete: false });
  return userInfo;
};

const removeUserById = async (id) => {
  const db = await connectDB();

  const response = await db.collection("users").findOneAndUpdate(
    {
      _id: new ObjectId(id),
      isActive: true,
      isDelete: false,
    },
    {
      $set: {
        isActive: false,
        isDelete: true,
      },
    },
    { returnDocument: "after" }
  );

  return response;
};

const getUserByType = async (type) => {
  const db = await connectDB();

  const response = await db
    .collection("users")
    .find({ userType: type, isActive: true, isDelete: false })
    .toArray();
  return response;
};

const deleteUserById = async (id) => {
  const db = await connectDB();

  const userDetails = await db
    .collection("users")
    .findOne({ _id: new ObjectId(id), isActive: true, isDelete: false });

  const response = await db.collection("users").deleteOne({
    _id: new ObjectId(id),
    isActive: true,
    isDelete: false,
  });

  return { ...response, ...userDetails };
};

const deleteAllUser = async () => {
  const db = await connectDB();

  const response = await db.collection("users").deleteMany({});
  return response;
};

module.exports = {
  createUser,
  getAllUser,
  getUserInfoById,
  removeUserById,
  getUserByType,
  deleteUserById,
  deleteAllUser,
};
