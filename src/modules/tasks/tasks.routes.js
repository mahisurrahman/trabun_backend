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

module.exports = router;
