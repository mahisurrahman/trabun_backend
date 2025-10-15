const express = require("express");
const router = express.Router();
const taskLogController = require("./taskLogs.controller");

// Create
router.post("/create", taskLogController.createTaskLog);

// Read
router.get("/all", taskLogController.getAllTaskLogs);
router.post("/filterTasks/all", taskLogController.getTaskLogsWithFilters);
router.get("/srcById/:id", taskLogController.getTaskLogById);
router.get("/assignedto/:id", taskLogController.getTaskLogAssignedToId);
router.get("/assignedby/:id", taskLogController.getTaskLogAssignedById);
router.get("/srcByCreator/:id", taskLogController.getTaskLogCreatorId);
router.get("/srcByTask/:id", taskLogController.getTaskLogByTaskId);
router.get("/start/:id", taskLogController.taskLogStart);
router.get("/pause/:id", taskLogController.taskLogPause);
router.get("/resume/:id", taskLogController.taskLogResume);
// router.post("/src/user/task", taskLogController);

// Update
router.put("/update/:id", taskLogController.updateTaskLog);
router.post("/updateStatus/:id", taskLogController.updateTaskStatus);

// Pause / Resume / End
// router.put("/pause/:id", taskLogController.taskLogPause);
// router.put("/resume/:id", taskLogController.taskLogResume);
// router.put("/end/:id", taskLogController.endTaskLog);

// Soft Delete / Restore / Hard Delete
router.put("/remove/:id", taskLogController.softDeleteTaskLog);
router.put("/restore/:id", taskLogController.restoreTaskLog);
router.delete("/delete/:id", taskLogController.hardDeleteTaskLog);

module.exports = router;
