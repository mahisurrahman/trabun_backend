const taskServices = require("./tasks.service");

// ✅ Create Task
const createTask = async (req, res) => {
  try {
    const response = await taskServices.createTask(req.body);
    return res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Task Create Controller - Internal Server Error",
      data: [],
    });
  }
};

// ✅ Soft Remove
const softRemoveTask = async (req, res) => {
  try {
    const response = await taskServices.softRemoveTask(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Task Soft Remove Controller - Internal Server Error",
      data: [],
    });
  }
};

// ✅ Hard Delete
const hardDeleteTask = async (req, res) => {
  try {
    const response = await taskServices.hardDeleteTask(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Task Hard Delete Controller - Internal Server Error",
      data: [],
    });
  }
};

// ✅ Get by ID
const getTaskById = async (req, res) => {
  try {
    const response = await taskServices.getTaskById(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Task by ID Controller - Internal Server Error",
      data: [],
    });
  }
};

// ✅ Get All
const getAllTasks = async (req, res) => {
  try {
    const response = await taskServices.getAllTasks();
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get All Tasks Controller - Internal Server Error",
      data: [],
    });
  }
};

// ✅ Get by Assigned By
const getTasksByAssignedById = async (req, res) => {
  try {
    const response = await taskServices.getTasksByAssignedById(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Tasks by Assigned By Controller - Internal Server Error",
      data: [],
    });
  }
};

// ✅ Get by Assigned To
const getTasksByAssignedToId = async (req, res) => {
  try {
    const response = await taskServices.getTasksByAssignedToId(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Tasks by Assigned To Controller - Internal Server Error",
      data: [],
    });
  }
};

// ✅ Get by Creator
const getTasksByCreatorId = async (req, res) => {
  try {
    const response = await taskServices.getTasksByCreatorId(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Tasks by Creator Controller - Internal Server Error",
      data: [],
    });
  }
};

// ✅ Get by Status
const getTasksByStatus = async (req, res) => {
  try {
    const response = await taskServices.getTasksByStatus(req.body.status);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Tasks by Status Controller - Internal Server Error",
      data: [],
    });
  }
};

const getTasksByBacklog = async (req, res) => {
  try {
    const response = await taskServices.getTaskByBacklog();
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get Tasks by Backlog Controller - Internal Server Error",
      data: [],
    });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const response = await taskServices.updateTaskById(id, updateData);
    res.send(response);
  } catch (error) {
    console.log("Update Task Controller - Internal Server Error", error);
    res.send({
      error: true,
      status: 500,
      message: "Update Task Controller - Internal Server Error",
      data: null,
    });
  }
};

// ✅ Change Status by Task ID
const changeTaskStatusById = async (req, res) => {
  try {
    const response = await taskServices.changeTaskStatusById(
      req.params.id,
      req.body.status
    );
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Change Task Status Controller - Internal Server Error",
      data: [],
    });
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
  getTasksByBacklog,
  changeTaskStatusById,
  updateTaskById,
};
