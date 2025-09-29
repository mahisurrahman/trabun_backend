const taskQuery = require("./tasks.queries");

const createTask = async () => {
  try {
    const response = await taskQuery.createTask(data);
    if (response !== null) {
      return {
        status: 200,
        error: false,
        message: "Task Created Successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Create Task",
        data: null,
      };
    }
  } catch (error) {
    console.log("Create Task Service - Internal Server Error");
    return {
      status: 500,
      error: true,
      message: "Create Task Service - Internal Server Error",
      data: null,
    };
  }
};
