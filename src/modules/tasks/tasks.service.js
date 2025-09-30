const taskQuery = require("./tasks.queries");

// ✅ Create Task
const createTask = async (data) => {
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
    console.log("Create Task Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Create Task Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Soft Remove
const softRemoveTask = async (taskId) => {
  try {
    const response = await taskQuery.softRemoveTask(taskId);
    if (response.modifiedCount > 0) {
      return {
        status: 200,
        error: false,
        message: "Task Soft Removed Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Task Not Found or Already Removed",
        data: null,
      };
    }
  } catch (error) {
    console.log("Soft Remove Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Soft Remove Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Hard Delete
const hardDeleteTask = async (taskId) => {
  try {
    const response = await taskQuery.hardDeleteTask(taskId);
    if (response.deletedCount > 0) {
      return {
        status: 200,
        error: false,
        message: "Task Hard Deleted Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Task Not Found",
        data: null,
      };
    }
  } catch (error) {
    console.log("Hard Delete Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Hard Delete Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Get Task by ID
const getTaskById = async (taskId) => {
  try {
    const response = await taskQuery.getTaskById(taskId);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Retrieved Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Task Not Found",
        data: null,
      };
    }
  } catch (error) {
    console.log("Get Task by ID Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Get Task by ID Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Get All Tasks
const getAllTasks = async () => {
  try {
    const response = await taskQuery.getAllTasks();
    return {
      status: 200,
      error: false,
      message: "All Tasks Retrieved Successfully",
      data: response,
    };
  } catch (error) {
    console.log("Get All Tasks Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Get All Tasks Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Get Tasks by Assigned By
const getTasksByAssignedById = async (userId) => {
  try {
    const response = await taskQuery.getTasksByAssignedById(userId);
    return {
      status: 200,
      error: false,
      message: "Tasks Retrieved Successfully",
      data: response,
    };
  } catch (error) {
    console.log(
      "Get Tasks by Assigned By Service - Internal Server Error",
      error
    );
    return {
      status: 500,
      error: true,
      message: "Get Tasks by Assigned By Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Get Tasks by Assigned To
const getTasksByAssignedToId = async (userId) => {
  try {
    const response = await taskQuery.getTasksByAssignedToId(userId);
    return {
      status: 200,
      error: false,
      message: "Tasks Retrieved Successfully",
      data: response,
    };
  } catch (error) {
    console.log(
      "Get Tasks by Assigned To Service - Internal Server Error",
      error
    );
    return {
      status: 500,
      error: true,
      message: "Get Tasks by Assigned To Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Get Tasks by Creator
const getTasksByCreatorId = async (creatorId) => {
  try {
    const response = await taskQuery.getTasksByCreatorId(creatorId);
    return {
      status: 200,
      error: false,
      message: "Tasks Retrieved Successfully",
      data: response,
    };
  } catch (error) {
    console.log("Get Tasks by Creator Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Get Tasks by Creator Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Get Tasks by Status
const getTasksByStatus = async (status) => {
  try {
    const response = await taskQuery.getTasksByStatus(status);
    return {
      status: 200,
      error: false,
      message: "Tasks Retrieved Successfully",
      data: response,
    };
  } catch (error) {
    console.log("Get Tasks by Status Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Get Tasks by Status Service - Internal Server Error",
      data: null,
    };
  }
};

// ✅ Change Task Status by ID
const changeTaskStatusById = async (taskId, newStatus) => {
  try {
    const response = await taskQuery.changeTaskStatusById(taskId, newStatus);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Status Updated Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Task Not Found",
        data: null,
      };
    }
  } catch (error) {
    console.log("Change Task Status Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Change Task Status Service - Internal Server Error",
      data: null,
    };
  }
};

module.exports = {
  createTask,
  softRemoveTask,
  hardDeleteTask,
  getTaskById,
  getAllTasks,
  getTasksByAssignedById,
  getTasksByAssignedToId,
  getTasksByCreatorId,
  getTasksByStatus,
  changeTaskStatusById,
};
