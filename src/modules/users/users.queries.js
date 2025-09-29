require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

const loginUser = async (credentials) => {
  const { username, password } = credentials;
  const db = await connectDB();

  const checkUserExist = await db
    .collection("users")
    .findOne({ username: username, isActive: true, isDelete: false });

  if (checkUserExist === null) {
    return checkUserExist;
  }

  const isMatch = await bcrypt.compare(password, checkUserExist.password);

  if (!isMatch) {
    return isMatch;
  } else {
    const timestamp = new Date();
    const user = {
      userId: "",
      timestamp: timestamp,
    };

    user.userId = checkUserExist._id;
    const refreshToken = generateRefreshToken(user);

    let auth_token = refreshToken;

    const createRefreshTokenInDB = await db.collection("auth").insertOne({
      auth_token: auth_token,
      timestamp: timestamp,
      user_id: checkUserExist._id.toString(),
      isDelete: false,
      isActive: true,
      status: true,
      updateAt: null,
      createAt: new Date(),
    });

    const loginInfo = {
      token: checkUserExist._id,
      timestamp: timestamp,
    };

    const accessToken = generateAccessToken(loginInfo);
    let data = { accessToken: accessToken, refreshToken: refreshToken };

    return data;
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

const getUserInfo = async (id) => {
  const db = await connectDB();

  const userInfo = await db
    .collection("users")
    .findOne({ _id: new ObjectId(id), isActive: true, isDelete: false });
  return userInfo;
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

const removeAuth = async (id) => {
  const db = await connectDB();

  const response = await db.collection("auth").findOneAndUpdate(
    { user_id: id },
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

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUserInfoById,
  removeUserById,
  getUserByType,
  deleteUserById,
  deleteAllUser,
  getUserInfo,
  removeAuth,
};
