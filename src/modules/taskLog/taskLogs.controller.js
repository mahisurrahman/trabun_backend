const taskLogService = require("./taskLogs.services");

const createTaskLog = async (req, res) => {
  try {
    const response = await taskLogService.createTaskLog(req.body);

    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Create Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const getAllTaskLogs = async (req, res) => {
  try {
    const response = await taskLogService.getAllTaskLogs();
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get All Task Logs Controller - Internal Server Error",
      data: [],
    });
  }
};

const getTaskLogsWithFilters = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const response = await taskLogService.getTaskLogsWithFilters(
      startDate,
      endDate
    );

    return res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Task Logs With Filters Controller - Internal Server Error",
      data: [],
    });
  }
};

const getTaskLogById = async (req, res) => {
  try {
    const response = await taskLogService.getTaskLogById(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Task Log By ID Controller - Internal Server Error",
      data: [],
    });
  }
};

const getTaskLogAssignedToId = async (req, res) => {
  try {
    const response = await taskLogService.getTaskLogAssignedToId(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Task Log AssignedToId Controller - Internal Server Error",
      data: [],
    });
  }
};

const getTaskLogAssignedById = async (req, res) => {
  try {
    const response = await taskLogService.getTaskLogAssignedById(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Task Log AssignedById Controller - Internal Server Error",
      data: [],
    });
  }
};

const getTaskLogCreatorId = async (req, res) => {
  try {
    const response = await taskLogService.getTaskLogCreatorId(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Task Log CreatorId Controller - Internal Server Error",
      data: [],
    });
  }
};

const getTaskLogByTaskId = async (req, res) => {
  try {
    const response = await taskLogService.getTaskLogByTaskId(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Task Log By TaskId Controller - Internal Server Error",
      data: [],
    });
  }
};

const updateTaskLog = async (req, res) => {
  try {
    const response = await taskLogService.updateTaskLog(
      req.params.id,
      req.body
    );
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Update Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const response = await taskLogService.updateTaskStatus(
      req.params.id,
      req.body
    );
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Update Task Status Controller - Internal Server Error",
      data: [],
    });
  }
};

const softDeleteTaskLog = async (req, res) => {
  try {
    const response = await taskLogService.softDeleteTaskLog(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Soft Delete Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const taskLogStart = async (req, res) => {
  try {
    const response = await taskLogService.startTask(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Start Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const taskLogPause = async (req, res) => {
  try {
    const response = await taskLogService.pauseTask(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Pause Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const taskLogResume = async (req, res) => {
  try {
    const response = await taskLogService.resumeTask(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Resume Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const restoreTaskLog = async (req, res) => {
  try {
    const response = await taskLogService.restoreTaskLog(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Restore Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const hardDeleteTaskLog = async (req, res) => {
  try {
    const response = await taskLogService.hardDeleteTaskLog(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Hard Delete Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const endTaskLog = async (req, res) => {
  try {
    const response = await taskLogService.endTaskLog(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "End Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const pauseTaskLog = async (req, res) => {
  try {
    const response = await taskLogService.pauseTaskLog(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Pause Task Log Controller - Internal Server Error",
      data: [],
    });
  }
};

const resumeTaskLog = async (req, res) => {
  try {
    const response = await taskLogService.resumeTaskLog(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Resume Task Log Controller - Internal Server Error",
      data: [],
    });
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
  taskLogStart,
  taskLogPause,
  taskLogResume,
};
