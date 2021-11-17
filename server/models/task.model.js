var con = require("../config/db.config");

// Task entity.
var Task = function (task) {
  this.title = task.title;
  this.description = task.description;
  this.deadline = task.deadline;
  this.creator = task.creator;
  this.assignee = task.assignee;
  this.state = task.state;
  this.solution = task.solution;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// Fetch all new request.
Task.readAllTask = (result) => {
  con.query("SELECT * FROM task WHERE state='request'", (err, res) => {
    if (err) {
      console.log("Error while fetching tasks", err);
      result(null, err);
    } else {
      console.log("Tasks fetched successfully");
      result(null, res);
    }
  });
};

// Fetch a user tasks by state.
Task.readTask = (id, result) => {
  con.query(
    "SELECT * FROM task WHERE creator=? OR assignee=?",
    [id, id],
    (err, res) => {
      if (err) {
        console.log("Error while fetching tasks", err);
        result(null, err);
      } else {
        console.log("Tasks fetched successfully");
        result(null, res);
      }
    }
  );
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

// Assign a task.
Task.assignTask = (id, userId, state, result) => {
  con.query(
    "UPDATE task SET assignee=?,state=?,updated_at=? WHERE id = ?",
    [userId, state, new Date(), id],
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

Task.updateTaskState = (id, newState, result) => {
  con.query(
    "UPDATE task SET state=?,updated_at=? WHERE id = ?",
    [newState, new Date(), id],
    (err, res) => {
      if (err) {
        console.log(`Error while updating task state: ${err}`);
        result(err.message, null);
      } else {
        Task.getTaskById(id, result);
      }
    }
  );
};

module.exports = Task;
