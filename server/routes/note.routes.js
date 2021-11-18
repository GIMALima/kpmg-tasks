const router = require("express").Router();
const noteController = require("../controllers/note.controller");

// Endpoint to fetch all notes.
router.get("/", noteController.readNote);

// Endpoint for note creation.
router.post("/", noteController.createNote);

// Endpoint to update note.
router.put("/:id", noteController.updateNote);

// Endpoint to delete note.
router.delete("/:id", noteController.deleteNote);

module.exports = router;
