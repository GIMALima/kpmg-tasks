const Task = require("../models/task.model");

module.exports.readTask = (req, res) => {
  Task.readTask((err, task) => {
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
  const taskData = new Task(req.body);

  Task.updateTask(req.params.id, taskData, (err, task) => {
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
