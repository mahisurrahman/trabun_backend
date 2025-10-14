const timelineLogService = require("./timeline.services.js");

const createTimeLineLog = async (req, res) => {
  try {
    const response = await timelineLogService.createTimeLine(req.body);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Create Task Timeline Controller - Internal Server Error",
      data: [],
    });
  }
};

const getAllTimeLineLogs = async (req, res) => {
  try {
    const response = await timelineLogService.getAllTimeLine(req.params.id);
    res.send(response);
  } catch (error) {
    res.send({
      error: true,
      status: 500,
      message: "Get All Task Timneline Controller - Internal Server Error",
      data: [],
    });
  }
};

module.exports = { createTimeLineLog, getAllTimeLineLogs };
