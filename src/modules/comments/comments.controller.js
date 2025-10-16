const commentServices = require(".//comments.services.js");

// ======================
// 🟢 Create Comment
// ======================
const createCommentCntrlr = async (req, res) => {
  try {
    const response = await commentServices.createCommentSrvc(req.body);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Create Comment Controller Error:", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Create Comment Controller - Internal Server Error",
      data: null,
    });
  }
};

// ======================
// 🟢 Get All Comments
// ======================
const getAllCommentsCntrlr = async (req, res) => {
  try {
    const response = await commentServices.getAllCommentsSrvc();
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Get All Comments Controller Error:", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Get All Comments Controller - Internal Server Error",
      data: null,
    });
  }
};

// ======================
// 🟢 Get Comments by Task ID
// ======================
const getCommentsByTaskIdCntrlr = async (req, res) => {
  try {
    const { taskId } = req.params;
    const response = await commentServices.getCommentsByTaskIdSrvc(taskId);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Get Comments By Task ID Controller Error:", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Get Comments By Task ID Controller - Internal Server Error",
      data: null,
    });
  }
};

// ======================
// 🟢 Get Comments by Task Log ID
// ======================
const getCommentsByTaskLogIdCntrlr = async (req, res) => {
  try {
    const { taskLogId } = req.params;
    const response = await commentServices.getCommentsByTaskLogIdSrvc(
      taskLogId
    );
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Get Comments By Task Log ID Controller Error:", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Get Comments By Task Log ID Controller - Internal Server Error",
      data: null,
    });
  }
};

// ======================
// 🟢 Get Comment By ID
// ======================
const getCommentByIdCntrlr = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentServices.getCommentByIdSrvc(id);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Get Comment By ID Controller Error:", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Get Comment By ID Controller - Internal Server Error",
      data: null,
    });
  }
};

// ======================
// 🟡 Update Comment
// ======================
const updateCommentCntrlr = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentServices.updateCommentSrvc(id, req.body);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Update Comment Controller Error:", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Update Comment Controller - Internal Server Error",
      data: null,
    });
  }
};

// ======================
// 🔴 Soft Delete Comment
// ======================
const removeCommentCntrlr = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentServices.removeCommentSrvc(id);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Remove Comment Controller Error:", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Remove Comment Controller - Internal Server Error",
      data: null,
    });
  }
};

// ======================
// ⚫ Hard Delete Comment
// ======================
const hardDeleteCommentCntrlr = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentServices.hardDeleteCommentSrvc(id);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Hard Delete Comment Controller Error:", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Hard Delete Comment Controller - Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  createCommentCntrlr,
  getAllCommentsCntrlr,
  getCommentsByTaskIdCntrlr,
  getCommentsByTaskLogIdCntrlr,
  getCommentByIdCntrlr,
  updateCommentCntrlr,
  removeCommentCntrlr,
  hardDeleteCommentCntrlr,
};
