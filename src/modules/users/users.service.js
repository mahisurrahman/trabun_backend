const userQueries = require("./users.queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("../../config/db");

const createUser = async (bodyData) => {
  const { username, email, password, traId, designation, userType } = bodyData;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      username,
      email,
      password: hashedPassword,
      traId,
      designation,
      userType,
    };
    const user = await userQueries.createUser(userData);
    return {
      error: user.error,
      data: user.data,
      errorMessage: user.errorMessage,
    };
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

const loginUserService = async (credentials) => {
  try {
    const response = await userQueries.loginUser(credentials);
    if (response) {
      return {
        status: 200,
        error: true,
        message: "Access Token Generated",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Access Token Failed",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error User Login Service", error);
    return {
      error: true,
      status: 500,
      message: "User Login Service - Internal Server Error",
      data: [],
    };
  }
};

const getUserInfoServc = async (id) => {
  try {
    const result = await userQueries.getUserInfo(id);
    if (result === null) {
      return {
        status: 404,
        error: true,
        message: "User Not Found",
        data: null,
      };
    } else {
      const {
        password,
        status,
        isActive,
        isDelete,
        createAt,
        updateAt,
        ...otherValues
      } = result;
      return {
        status: 200,
        error: false,
        message: "User Info Fetched Successfully",
        data: otherValues,
      };
    }
  } catch (error) {
    console.error("Get User Info Service Error", error);
    return {
      error: true,
      status: 500,
      message: "Get User Info Service Error - Internal Server Error",
      data: [],
    };
  }
};

const getAllUser = async () => {
  try {
    const result = await userQueries.getAllUser();
    if (result.length >= 0) {
      return {
        status: 200,
        error: false,
        message: "User Fetched Sucessfull",
        data: result,
      };
    } else {
      return {
        error: true,
        status: 400,
        message: "User Fetched Failed",
        data: [],
      };
    }
  } catch (error) {
    console.error("Error Fetch All Users", error);
    return {
      error: true,
      status: 500,
      message: "User Fetch All Service - Internal Server Error",
      data: [],
    };
  }
};

const getUserInfoById = async (id) => {
  try {
    const response = await userQueries.getUserInfoById(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Retrieved User Info Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "No User Found on this ID",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error Fetch User Info By User Id", error);
    return {
      error: true,
      status: 500,
      message: "User Info By Id Service - Internal Server Error",
      data: [],
    };
  }
};

const removeUserById = async (id) => {
  try {
    const result = await userQueries.removeUserById(id);
    if (result) {
      return {
        status: 200,
        error: false,
        message: "Successfully Removed",
        data: result,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Couldn't Find user with this ID",
        data: result,
      };
    }
  } catch (error) {
    console.error("Error Remove User By User Id", error);
    return {
      error: true,
      status: 500,
      message: "Remove User By Id Service - Internal Server Error",
      data: [],
    };
  }
};

const getUserByType = async (type) => {
  try {
    const response = await userQueries.getUserByType(type);
    if (response.length >= 0) {
      return {
        status: 200,
        error: true,
        message: "Fetch User By User Type",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Fetch Failed By User Type",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error Fetching User By User Type", error);
    return {
      error: true,
      status: 500,
      message: "Fetch User By Type Service - Internal Server Error",
      data: [],
    };
  }
};

const deleteByUserId = async (id) => {
  try {
    const response = await userQueries.deleteUserById(id);
    if (response.acknowledged === true) {
      const { acknowledged, deletedCount, ...otherValues } = response;
      const newOtherValues = { ...otherValues };
      newOtherValues.username = "Yellow";
      return {
        data: { otherValues, newOtherValues },
        status: 200,
        error: false,
        message: "Deleted the User successfully",
      };
    } else {
      return {
        data: response,
        status: 400,
        error: true,
        message: "Delete Failed",
      };
    }
  } catch (error) {
    console.error("Delete the user by user Id", error);
    return {
      error: true,
      status: 500,
      message: "Delete the user by user ID Service - Internal Server Error",
      data: [],
    };
  }
};

const deleteAllUser = async () => {
  try {
    const response = await userQueries.deleteAllUser();
    if (response.acknowledged === true) {
      return {
        status: 200,
        error: false,
        message: "Deletd All User",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Delete Users",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error Fetching User By User Type", error);
    return {
      error: true,
      status: 500,
      message: "Fetch User By Type Service - Internal Server Error",
      data: [],
    };
  }
};

const logoutUser = async (data) => {
  const db = await connectDB();
  try {
    if (!data.headers["authorization"]) {
      return { status: 400, error: true, data: null, message: "Unauthorized" };
    }
    const authHeader = data.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return { status: 400, error: true, data: null, message: "Unauthorized" };
    }

    let user = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
        if (err) {
          return reject(err);
        }
        resolve(decodedUser);
      });
    });

    console.log(user, "User Data");

    if (user.length === 0 || user === undefined || user === null) {
      return {
        status: 400,
        error: true,
        data: null,
        message: "Unauthorized",
      };
    }

    const userResponse = await userQueries.removeAuth(user.token);
    if (userResponse === undefined || userResponse === null) {
      return {
        status: 200,
        error: false,
        data: null,
        message: "User Already Logout",
      };
    }

    if (userResponse.error) {
      return {
        status: 400,
        error: true,
        data: null,
        message: "Unauthorized",
      };
    } else {
      return {
        status: 200,
        error: false,
        data: null,
        message: "User has been logged out",
      };
    }
  } catch (error) {
    console.error("Error Logging Out User", error);
    return {
      error: true,
      status: 500,
      message: "Log out service - Internal Server Error",
      data: [],
    };
  }
};

module.exports = {
  createUser,
  loginUserService,
  getAllUser,
  getUserInfoById,
  removeUserById,
  getUserByType,
  deleteByUserId,
  deleteAllUser,
  getUserInfoServc,
  logoutUser,
};
