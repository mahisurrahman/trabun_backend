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

const getAllUser = async (req, res) => {
  try {
    const result = await userService.getAllUser();
    console.log(result, "Controllers");
  } catch (error) {
    console.log("Error Fetching All Users", error);
    res.error(true, "Failed to Fetch All Users", 400, null);
  }
};

module.exports = {
  createUser,
  getAllUser,
};
