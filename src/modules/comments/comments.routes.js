const express = require("express");
const router = express.Router();

const commentController = require("./comments.controller.js");

// ======================
// 🟢 Create Comment
// ======================
router.post("/create", commentController.createCommentCntrlr);

// ======================
// 🟢 Get All Comments
// ======================
router.get("/getAll", commentController.getAllCommentsCntrlr);

// ======================
// 🟢 Get Comments by Task ID
// ======================
router.get("/getByTaskId/:taskId", commentController.getCommentsByTaskIdCntrlr);

// ======================
// 🟢 Get Comments by Task Log ID
// ======================
router.get(
  "/getByTaskLogId/:taskLogId",
  commentController.getCommentsByTaskLogIdCntrlr
);

// ======================
// 🟢 Get Single Comment by ID
// ======================
router.get("/getById/:id", commentController.getCommentByIdCntrlr);

// ======================
// 🟡 Update Comment
// ======================
router.post("/update/:id", commentController.updateCommentCntrlr);

// ======================
// 🔴 Soft Delete Comment
// ======================
router.get("/remove/:id", commentController.removeCommentCntrlr);

// ======================
// ⚫ Hard Delete Comment
// ======================
router.get("/delete/:id", commentController.hardDeleteCommentCntrlr);

module.exports = router;
