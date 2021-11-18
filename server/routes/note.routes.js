const router = require("express").Router();
const noteController = require("../controllers/note.controller");

// Endpoint to fetch all notes.
router.get("/", noteController.getNotes);

// Endpoint to create a note.
router.post("/", noteController.createNote);

// Endpoint to update a note.
router.put("/:id", noteController.updateNote);

// Endpoint to delete a note.
router.delete("/:id", noteController.deleteNote);

module.exports = router;
