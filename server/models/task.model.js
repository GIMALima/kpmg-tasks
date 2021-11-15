var con = require("../config/db.config");

// Task entity.
var Task = function (task) {
  this.title = task.title;
  this.description = task.description;
  this.deadline = task.deadline;
  this.creator_id = task.creator_id;
  this.assign_id = task.assign_id;
  this.state = task.state;
  this.created_at = task.created_at;
  this.updated_at = task.updated_at;
  this.solution_file = task.solution_file;
};

// Fetch all tasks.
Task.readTask = (result) => {
  con.query("SELECT * FROM task", (err, res) => {
    if (err) {
      console.log("Error while fetching tasks", err);
      result(null, err);
    } else {
      console.log("Tasks fetched successfully");
      result(null, res);
    }
  });
};

// Fetch task by id.
Task.getTaskById = (id, result) => {
  con.query('SELECT * FROM task WHERE id = "' + id + '"', (err, task) => {
    if (err) result(err.message, null);
    else {
      console.log("Task found successfully");
      result(null, task[0]);
    }
  });
};

// Create a new task.
Task.createTask = (taskReqData, result) => {
  con.query("INSERT INTO task SET ? ", taskReqData, (err, res) => {
    if (err) {
      console.log(`Error while inserting task data: ${err}`);
      result(err.message, null);
    } else {
      Task.getTaskById(res.insertId, result);
    }
  });
};

// Update a task.
Task.updateTask = (id, taskReqData, result) => {
  con.query(
    "UPDATE task SET title=?,description=?,deadline=?,updated_at=? WHERE id = ?",
    [
      taskReqData.title,
      taskReqData.description,
      taskReqData.deadline,
      new Date(),
      id,
    ],
    (err, res) => {
      if (err) {
        console.log(`Error while updating task data: ${err}`);
        result(err.message, null);
      } else {
        Task.getTaskById(id, result);
      }
    }
  );
};

// Delete a task.
Task.deleteTask = (id, result) => {
  con.query("DELETE FROM task WHERE id=?", [id], (err, res) => {
    if (err) {
      console.log(`Error while deleting task: ${err}`);
      result(err.message, null);
    } else {
      result(null, res);
    }
  });
};

// Upload task solution.
Task.uploadSolutionTask = (id, file, result) => {
  con.query(
    "UPDATE task SET solution_file=?,updated_at=? WHERE id = ?",
    [file, new Date(), id],
    (err, res) => {
      if (err) {
        console.log(`Error while uploading task solution: ${err}`);
        result(err.message, null);
      } else {
        Task.getTaskById(id, result);
      }
    }
  );
};

module.exports = Task;
