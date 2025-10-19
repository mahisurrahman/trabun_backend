const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const userRoutes = require("./modules/users/users.routes");
const labelRoutes = require("./modules/labels/labels.routes");
const taskRoutes = require("./modules/tasks/tasks.routes");
const taskLogRoutes = require("./modules/taskLog/taskLogs.routes");
const responseMiddleware = require("./middlewares/responseMiddleware");
const timeLineRoutes = require("./modules/timeline/timeline.routes");
const commentRoutes = require("./modules/comments/comments.routes");
const notificationControll = require("./modules/notificationControll/notificationControll.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const publicDir = process.env.PUBLIC_DIR || "public";
app.use(express.static(path.join(__dirname, "..", publicDir)));

app.get("/", (req, res) => {
  res.send("Server Initiated Smoothly !!!");
});

app.use(responseMiddleware);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/label", labelRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/taskLog", taskLogRoutes);
app.use("/api/v1/timeline", timeLineRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/notifyControll", notificationControll);

module.exports = app;
