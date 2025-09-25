const userQueries = require("./users.queries");
const bcrypt = require("bcrypt");

const createUser = async (bodyData) => {
  const { username, email, password, traId, designation } = bodyData;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      username,
      email,
      password: hashedPassword,
      traId,
      designation,
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
    if (result.error === false) {
      return result;
    }
    return {
      error: user.error,
      data: user.data,
      errorMessage: user.errorMessage,
    };
  } catch (error) {
    console.error("Error Fetch All Users", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUser,
};
