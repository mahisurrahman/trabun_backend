const timeLineQueries = require("./timeline.queries.js");

const createTimeLine = async (data) => {
  try {
    const response = await timeLineQueries.createTimeLineLog(data);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Task Timeline Created Successfully",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed to Create the Task Timeline",
        data: null,
      };
    }
  } catch (error) {
    console.log(
      "Create Task Timeline Log Service - Internal Server Error",
      error
    );
    return {
      status: 500,
      error: true,
      message: "Create Task Tiemline Log Service - Internal Server Error",
      data: null,
    };
  }
};

const getAllTimeLine = async (id) => {
  try {
    const response = await timeLineQueries.getAllTaskTimeLineLog(id);
    if (response && response.length > 0) {
      return {
        status: 200,
        error: false,
        message: "Task Timeline LOG Retrieved Successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "No Task Timeline LOG Found",
        data: [],
      };
    }
  } catch (error) {
    console.log("Get All Task Logs Service - Internal Server Error", error);
    return {
      status: 500,
      error: true,
      message: "Get All Task Logs Service - Internal Server Error",
      data: null,
    };
  }
};

module.exports = { createTimeLine, getAllTimeLine };
