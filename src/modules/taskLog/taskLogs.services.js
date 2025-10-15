const taskLogQuery = require("./taskLogs.queries");

const createTaskLog = async (data) => {
  try {
    const response = await taskLogQuery.createTaskLog(data);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Created Successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Create the Task Log",
        data: null,
      };
    }
  } catch (error) {
    console.log("Create Task Log Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Create Task Log Service - Internal Server Error",
      data: null,
    };
  }
};

const getAllTaskLogs = async () => {
  try {
    const response = await taskLogQuery.getAllTaskLogs();
    if (response && response.length > 0) {
      return {
        status: 200,
        error: false,
        message: "Task Logs Retrieved Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "No Task Logs Found",
        data: [],
      };
    }
  } catch (error) {
    console.log("Get All Task Logs Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Get All Task Logs Service - Internal Server Error",
      data: null,
    };
  }
};

const getTaskLogsWithFilters = async (startDate, endDate) => {
  try {
    const response = await taskLogQuery.getTaskLogsWithFilters(
      startDate,
      endDate
    );

    if (response && response.length > 0) {
      return {
        status: 200,
        error: false,
        message: "Filtered Task Logs Retrieved Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "No Task Logs Found for Given Filters",
        data: [],
      };
    }
  } catch (error) {
    console.log(
      "Get Task Logs With Filters Service - Internal Server Error",
      error
    );
    return {
      status: 500,
      error: true,
      message: "Get Task Logs With Filters Service - Internal Server Error",
      data: null,
    };
  }
};

const getTaskLogById = async (id) => {
  try {
    const response = await taskLogQuery.getTaskLogById(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Retrieved Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Task Log Not Found",
        data: null,
      };
    }
  } catch (error) {
    console.log("Get Task Log By ID Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Get Task Log By ID Service - Internal Server Error",
      data: null,
    };
  }
};

const getTaskLogAssignedToId = async (id) => {
  try {
    const response = await taskLogQuery.getTaskLogAssignedToId(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Retrieved Successfully (Assigned To)",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "No Task Log Found for AssignedToId",
        data: null,
      };
    }
  } catch (error) {
    console.log(
      "Get Task Log By AssignedToId Service - Internal Server Error",
      error
    );
    return {
      status: 500,
      error: true,
      message: "Get Task Log By AssignedToId Service - Internal Server Error",
      data: null,
    };
  }
};

const getTaskLogAssignedById = async (id) => {
  try {
    const response = await taskLogQuery.getTaskLogAssignedById(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Retrieved Successfully (Assigned By)",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "No Task Log Found for AssignedById",
        data: null,
      };
    }
  } catch (error) {
    console.log(
      "Get Task Log By AssignedById Service - Internal Server Error",
      error
    );
    return {
      status: 500,
      error: true,
      message: "Get Task Log By AssignedById Service - Internal Server Error",
      data: null,
    };
  }
};

const getTaskLogCreatorId = async (id) => {
  try {
    const response = await taskLogQuery.getTaskLogCreatorId(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Retrieved Successfully (Creator)",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "No Task Log Found for CreatorId",
        data: null,
      };
    }
  } catch (error) {
    console.log(
      "Get Task Log By CreatorId Service - Internal Server Error",
      error
    );
    return {
      status: 500,
      error: true,
      message: "Get Task Log By CreatorId Service - Internal Server Error",
      data: null,
    };
  }
};

const getTaskLogByTaskId = async (id) => {
  try {
    const response = await taskLogQuery.getTaskLogByTaskId(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Retrieved Successfully (By TaskId)",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "No Task Log Found for TaskId",
        data: null,
      };
    }
  } catch (error) {
    console.log(
      "Get Task Log By TaskId Service - Internal Server Error",
      error
    );
    return {
      status: 500,
      error: true,
      message: "Get Task Log By TaskId Service - Internal Server Error",
      data: null,
    };
  }
};

const updateTaskLog = async (id, updateData) => {
  try {
    const response = await taskLogQuery.updateTaskLog(id, updateData);

    if (response.value) {
      return {
        status: 200,
        error: false,
        message: "Task Log Updated Successfully",
        data: response.value,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Update the Task Log",
        data: null,
      };
    }
  } catch (error) {
    console.log("Update Task Log Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Update Task Log Service - Internal Server Error",
      data: null,
    };
  }
};

const updateTaskStatus = async (id, body) => {
  try {
    const response = await taskLogQuery.updateTaskStatus(id, body);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Status Updated Successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Update Task Status",
        data: null,
      };
    }
  } catch (error) {
    console.log("Update Task Status Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Update Task Status Service - Internal Server Error",
      data: null,
    };
  }
};

const startTask = async (id) => {
  try {
    const response = await taskLogQuery.startTaskLog(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Started Successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Start Task",
        data: null,
      };
    }
  } catch (error) {
    console.log(" Task Start Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: " Task Start Service - Internal Server Error",
      data: null,
    };
  }
};

const pauseTask = async (id) => {
  try {
    const response = await taskLogQuery.pauseTask(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Paused Successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Pause Task",
        data: null,
      };
    }
  } catch (error) {
    console.log(" Task Pause Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: " Task Pause Service - Internal Server Error",
      data: null,
    };
  }
};

const resumeTask = async (id) => {
  try {
    const response = await taskLogQuery.resumeTaskLog(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Resumed Successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Resume Task",
        data: null,
      };
    }
  } catch (error) {
    console.log(" Task Resume Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: " Task Resume Service - Internal Server Error",
      data: null,
    };
  }
};

const softDeleteTaskLog = async (id) => {
  try {
    const response = await taskLogQuery.softDeleteTaskLog(id);
    if (response.value) {
      return {
        status: 200,
        error: false,
        message: "Task Log Soft Deleted Successfully",
        data: response.value,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Soft Delete Task Log",
        data: null,
      };
    }
  } catch (error) {
    console.log("Soft Delete Task Log Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Soft Delete Task Log Service - Internal Server Error",
      data: null,
    };
  }
};

const restoreTaskLog = async (id) => {
  try {
    const response = await taskLogQuery.restoreTaskLog(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Restored Successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Restore Task Log",
        data: null,
      };
    }
  } catch (error) {
    console.log("Restore Task Log Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Restore Task Log Service - Internal Server Error",
      data: null,
    };
  }
};

const hardDeleteTaskLog = async (id) => {
  try {
    const response = await taskLogQuery.hardDeleteTaskLog(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Permanently Deleted",
        data: null,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Hard Delete Task Log",
        data: null,
      };
    }
  } catch (error) {
    console.log("Hard Delete Task Log Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Hard Delete Task Log Service - Internal Server Error",
      data: null,
    };
  }
};

const endTaskLog = async (id) => {
  try {
    const response = await taskLogQuery.endTaskLog(id);
    if (response.value) {
      return {
        status: 200,
        error: false,
        message: "Task Log Ended Successfully",
        data: response.value,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to End Task Log",
        data: null,
      };
    }
  } catch (error) {
    console.log("End Task Log Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "End Task Log Service - Internal Server Error",
      data: null,
    };
  }
};

const pauseTaskLog = async (id) => {
  try {
    const response = await taskLogQuery.pauseTaskLog(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Paused Successfully",
        data: null,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Pause Task Log",
        data: null,
      };
    }
  } catch (error) {
    console.log("Pause Task Log Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Pause Task Log Service - Internal Server Error",
      data: null,
    };
  }
};

const resumeTaskLog = async (id) => {
  try {
    const response = await taskLogQuery.resumeTaskLog(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Log Resumed Successfully",
        data: null,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Resume Task Log",
        data: null,
      };
    }
  } catch (error) {
    console.log("Resume Task Log Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Resume Task Log Service - Internal Server Error",
      data: null,
    };
  }
};

module.exports = {
  createTaskLog,
  getAllTaskLogs,
  getTaskLogsWithFilters,
  getTaskLogById,
  getTaskLogAssignedToId,
  getTaskLogAssignedById,
  getTaskLogCreatorId,
  getTaskLogByTaskId,
  updateTaskLog,
  updateTaskStatus,
  softDeleteTaskLog,
  restoreTaskLog,
  hardDeleteTaskLog,
  // endTaskLog,
  // pauseTaskLog,
  // resumeTaskLog,
  startTask,
  pauseTask,
  resumeTask,
};
