const router = require("express").Router();
const taskController = require("../controllers/task.controller");
const multer = require("multer");
const upload = multer();

// Endpoint to fetch all tasks.
router.get("/", taskController.readTask);

// Endpoint for task creation.
router.post("/", taskController.createTask);

// Endpoint to update task.
router.put("/:id", taskController.updateTask);

// Endpoint to delete task.
router.delete("/:id", taskController.deleteTask);

// Enpoint to upload task solution zip file.
router.put("/upload/:id", upload.single("file"), taskController.uploadSolution);

module.exports = router;
