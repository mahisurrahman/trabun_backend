const express = require("express");
const router = express.Router();
const taskController = require("./tasks.controller");

router.post("/create", taskController.createTask);
router.get("/remove/:id", taskController.softRemoveTask);
router.get("/delete/:id", taskController.hardDeleteTask);
router.post("/changestatus/:id", taskController.changeTaskStatusById);
router.get("/get/src/:id", taskController.getTaskById);
router.get("/get/all", taskController.getAllTasks);
router.get("/get/assignedby/:id", taskController.getTasksByAssignedById);
router.get("/get/assignedto/:id", taskController.getTasksByAssignedToId);
router.get("/get/creator/:id", taskController.getTasksByCreatorId);
router.get("/get/by/status", taskController.getTasksByStatus);
router.get("/get/by/backlog", taskController.getTasksByBacklog);
router.post("/upt/:id", taskController.updateTaskById);
router.get("/total/task/:id", taskController.getTotalTasks);
router.get("/total/completed/:id", taskController.getTotalCompletedTasks);
router.get("/total/ongoing/:id", taskController.getTotalOnGoingTasks);
router.get("/total/pending/:id", taskController.getTotalPendingTasks);
router.get("/total/inque/:id", taskController.getTotalInQueTasks);
router.get("/total/review/:id", taskController.getTotalReviewTasks);

module.exports = router;
