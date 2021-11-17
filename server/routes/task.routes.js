const router = require("express").Router();
const taskController = require("../controllers/task.controller");
const multer = require("multer");
const upload = multer();

// Endpoint to fetch new requests.
router.get("/", taskController.readAllTask);

// Endpoint to fetch a user tasks by state.
router.get("/:id", taskController.readTask);

// Endpoint for task creation.
router.post("/", taskController.createTask);

// Endpoint to update task.
router.put("/:id", taskController.updateTask);

// Endpoint to delete task.
router.delete("/:id", taskController.deleteTask);

// Endpoint to upload task solution zip file.
router.put("/upload/:id", upload.single("file"), taskController.uploadSolution);

// Endpoint to change task state.
router.put("/state/:id", taskController.updateTaskState);

// Endpoint to assign task to a user.
router.put("/assign/:id", taskController.assignTask);

module.exports = router;
