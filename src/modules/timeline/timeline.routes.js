const express = require("express");
const router = express.Router();

const timeLineController = require("./timeline.controller");

router.post("/create", timeLineController.createTimeLineLog);
router.get("/srcById/:id", timeLineController.getAllTimeLineLogs);

module.exports = router;
