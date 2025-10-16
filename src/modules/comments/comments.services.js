const commentQueries = require("./comments.queries.js");

// ======================
// 🟢 Create Comment
// ======================
const createCommentSrvc = async (body) => {
  try {
    const response = await commentQueries.createComment(body);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Comment has been created successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Comment creation failed",
        data: null,
      };
    }
  } catch (error) {
    console.error("Create Comment Service Error:", error);
    return {
      status: 500,
      error: true,
      message: "Create Comment Service - Internal Server Error",
      data: null,
    };
  }
};

// ======================
// 🟢 Get All Comments
// ======================
const getAllCommentsSrvc = async () => {
  try {
    const response = await commentQueries.getAllComments();
    return {
      status: 200,
      error: false,
      message: "Comments fetched successfully",
      data: response,
    };
  } catch (error) {
    console.error("Get All Comments Service Error:", error);
    return {
      status: 500,
      error: true,
      message: "Get All Comments Service - Internal Server Error",
      data: null,
    };
  }
};

// ======================
// 🟢 Get Comments By Task ID
// ======================
const getCommentsByTaskIdSrvc = async (taskId) => {
  try {
    const response = await commentQueries.getCommentsByTaskId(taskId);
    return {
      status: 200,
      error: false,
      message: "Comments fetched successfully for the task",
      data: response,
    };
  } catch (error) {
    console.error("Get Comments By Task ID Service Error:", error);
    return {
      status: 500,
      error: true,
      message: "Get Comments By Task ID Service - Internal Server Error",
      data: null,
    };
  }
};

// ======================
// 🟢 Get Comments By Task Log ID
// ======================
const getCommentsByTaskLogIdSrvc = async (taskLogId) => {
  try {
    const response = await commentQueries.getCommentsByTaskLogId(taskLogId);
    return {
      status: 200,
      error: false,
      message: "Comments fetched successfully for the task log",
      data: response,
    };
  } catch (error) {
    console.error("Get Comments By Task Log ID Service Error:", error);
    return {
      status: 500,
      error: true,
      message: "Get Comments By Task Log ID Service - Internal Server Error",
      data: null,
    };
  }
};

// ======================
// 🟢 Get Single Comment By ID
// ======================
const getCommentByIdSrvc = async (id) => {
  try {
    const response = await commentQueries.getCommentById(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Comment fetched successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Comment not found",
        data: null,
      };
    }
  } catch (error) {
    console.error("Get Comment By ID Service Error:", error);
    return {
      status: 500,
      error: true,
      message: "Get Comment By ID Service - Internal Server Error",
      data: null,
    };
  }
};

// ======================
// 🟡 Update Comment
// ======================
const updateCommentSrvc = async (id, body) => {
  try {
    const response = await commentQueries.updateComment(id, body);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Comment updated successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Comment not found or update failed",
        data: null,
      };
    }
  } catch (error) {
    console.error("Update Comment Service Error:", error);
    return {
      status: 500,
      error: true,
      message: "Update Comment Service - Internal Server Error",
      data: null,
    };
  }
};

// ======================
// 🔴 Soft Delete Comment
// ======================
const removeCommentSrvc = async (id) => {
  try {
    const response = await commentQueries.removeComment(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Comment removed (soft delete) successfully",
        data: { _id: id },
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Comment not found or already deleted",
        data: null,
      };
    }
  } catch (error) {
    console.error("Remove Comment Service Error:", error);
    return {
      status: 500,
      error: true,
      message: "Remove Comment Service - Internal Server Error",
      data: null,
    };
  }
};

// ======================
// ⚫ Hard Delete Comment
// ======================
const hardDeleteCommentSrvc = async (id) => {
  try {
    const response = await commentQueries.hardDeleteComment(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Comment permanently deleted",
        data: { _id: id },
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Comment not found",
        data: null,
      };
    }
  } catch (error) {
    console.error("Hard Delete Comment Service Error:", error);
    return {
      status: 500,
      error: true,
      message: "Hard Delete Comment Service - Internal Server Error",
      data: null,
    };
  }
};

module.exports = {
  createCommentSrvc,
  getAllCommentsSrvc,
  getCommentsByTaskIdSrvc,
  getCommentsByTaskLogIdSrvc,
  getCommentByIdSrvc,
  updateCommentSrvc,
  removeCommentSrvc,
  hardDeleteCommentSrvc,
};
