const userService = require("./users.service");

const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    if (result.error) {
      return res.error(result.errorMessage, 400, null);
    } else {
      return res.success(result.data, 201, result.errorMessage);
    }
  } catch (error) {
    console.error("Error creating user", error);
    res.error(true, error.message, 500, null);
  }
};

const loginUserContlr = async (req, res) => {
  try {
    const response = await userService.loginUserService(req.body);
    res.send(response);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Login User Controller - Internal Server Error",
      data: [],
    };
  }
};

const logoutUserContrl = async (req, res) => {
  try {
    const result = await userService.logoutUser(req);
    return res.send(result);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Logout User Controller - Internal Server Error",
      data: [],
    };
  }
};

const getUserInfoContrl = async (req, res) => {
  try {
    const response = await userService.getUserInfoServc(req.user.token);
    res.send(response);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "User Info Controller - Internal Server Error",
      data: [],
    };
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await userService.getAllUser();
    return res.send(result);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "User Fetch All Controller - Internal Server Error",
      data: [],
    };
  }
};

const getUserInfoById = async (req, res) => {
  try {
    const response = await userService.getUserInfoById(req.params.id);
    res.send(response);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "User Info By ID Controller - Internal Server Error",
      data: [],
    };
  }
};

const removeUserById = async (req, res) => {
  try {
    const response = await userService.removeUserById(req.params.id);
    res.send(response);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Remove User By ID Controller - Internal Server Error",
      data: [],
    };
  }
};

const getUserByType = async (req, res) => {
  try {
    const response = await userService.getUserByType(req.body.type);
    res.send(response);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Get User By Type Controller - Internal Server Error",
      data: [],
    };
  }
};

const deleteUserById = async (req, res) => {
  try {
    const response = await userService.deleteByUserId(req.params.id);
    res.send(response);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Get User By Type Controller - Internal Server Error",
      data: [],
    };
  }
};

const deleteAllUser = async (req, res) => {
  try {
    const response = await userService.deleteAllUser();
    res.send(response);
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Get User By Type Controller - Internal Server Error",
      data: [],
    };
  }
};

module.exports = {
  createUser,
  loginUserContlr,
  getAllUser,
  getUserInfoById,
  removeUserById,
  getUserByType,
  deleteUserById,
  deleteAllUser,
  getUserInfoContrl,
  logoutUserContrl,
};
