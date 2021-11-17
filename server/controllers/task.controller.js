const Task = require("../models/task.model");
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readAllTask = (req, res) => {
  Task.readAllTask((err, task) => {
    if (err) {
      res.status(400).send(err);
    } else res.status(200).send(task);
  });
};

module.exports.readTask = (req, res) => {
  Task.readTask(req.params.id, (err, task) => {
    if (err) {
      res.status(400).send(err);
    } else res.status(200).send(task);
  });
};

module.exports.createTask = (req, res) => {
  const taskData = new Task(req.body);

  Task.createTask(taskData, (err, task) => {
    if (err) {
      res.status(400).send(err);
    } else res.status(201).json(task);
  });
};

module.exports.updateTask = (req, res) => {
  Task.updateTask(req.params.id, req.body.taskData, (err, task) => {
    if (err) {
      console.log("Update error : " + err);
      res.status(200).send(err);
    } else res.status(200).json(task);
  });
};

module.exports.deleteTask = (req, res) => {
  Task.deleteTask(req.params.id, (err, task) => {
    if (err) {
      console.log("Delete error : " + err);
      res.status(200).send(err);
    } else res.status(200).json(task);
  });
};

module.exports.uploadSolution = async (req, res) => {
  if (req.file !== null) {
    try {
      if (req.file.detectedMimeType != "application/zip")
        throw Error("invalid file");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(200).json({ errors });
    }

    const filename = req.params.id + Date.now() + ".zip";
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../../client/public/uploads/solutions/${filename}`
      )
    );

    Task.uploadSolutionTask(req.params.id, filename, (err, task) => {
      if (err) {
        console.log("Upload error : " + err);
        res.status(200).send(err);
      } else res.status(200).json(task);
    });
  }
};

module.exports.updateTaskState = (req, res) => {
  Task.updateTaskState(req.params.id, req.body.state, (err, task) => {
    if (err) {
      console.log("Update task state error : " + err);
      res.status(200).send(err);
    } else res.status(200).json(task);
  });
};
