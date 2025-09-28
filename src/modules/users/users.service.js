const userQueries = require("./users.queries");
const bcrypt = require("bcrypt");

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

module.exports = {
  createUser,
  getAllUser,
  getUserInfoById,
  removeUserById,
  getUserByType,
  deleteByUserId,
  deleteAllUser,
};
