var con = require("../config/db.config");

// Note entity.
var Note = function (note) {
  this.text = note.text;
  this.creator = note.creator;
  this.task = note.task;
};

// Fetch all notes.
Note.getNotes = (result) => {
  con.query("SELECT * FROM note", (err, res) => {
    if (err) {
      console.log("Error while fetching notes", err);
      result(null, err);
    } else {
      console.log("Task notes fetched successfully");
      result(null, res);
    }
  });
};

// Fetch note by id.
Note.getNoteById = (id, result) => {
  con.query("SELECT * FROM note WHERE id=?", [id], (err, note) => {
    if (err) result(err.message, null);
    else {
      console.log("Note found successfully");
      result(null, note[0]);
    }
  });
};

// Create a new note.
Note.createNote = (noteReqData, result) => {
  con.query("INSERT INTO note SET ? ", noteReqData, (err, res) => {
    if (err) {
      console.log(`Error while inserting note data: ${err}`);
      result(err.message, null);
    } else {
      Note.getNoteById(res.insertId, result);
    }
  });
};

// Update a note.
Note.updateNote = (id, text, result) => {
  con.query(
    "UPDATE note SET text=?,updated_at=? WHERE id=?",
    [text, new Date(), id],
    (err, res) => {
      if (err) {
        console.log(`Error while updating note data: ${err}`);
        result(err.message, null);
      } else {
        Note.getNoteById(id, result);
      }
    }
  );
};

// Delete a note.
Note.deleteNote = (id, result) => {
  con.query("DELETE FROM note WHERE id=?", [id], (err, res) => {
    if (err) {
      console.log(`Error while deleting note: ${err}`);
      result(err.message, null);
    } else {
      result(null, res);
    }
  });
};
module.exports = Note;
