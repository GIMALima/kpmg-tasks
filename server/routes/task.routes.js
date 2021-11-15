const router = require("express").Router();
const taskController = require("../controllers/task.controller");

// Endpoint to fetch all tasks.
router.get("/", taskController.readTask);

// Endpoint for task creation.
router.post("/", taskController.createTask);

// Endpoint to update task.
router.put("/:id", taskController.updateTask);

// Endpoint to delete task.
router.delete("/:id", taskController.deleteTask);

module.exports = router;
