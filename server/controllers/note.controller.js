const Note = require("../models/note.model");

module.exports.readNote = (req, res) => {
  Note.readNote((err, notes) => {
    if (err) {
      res.status(400).send(err);
    } else res.status(200).send(notes);
  });
};

module.exports.createNote = (req, res) => {
  const noteData = new Note(req.body);

  Note.createNote(noteData, (err, note) => {
    if (err) {
      res.status(400).send(err);
    } else res.status(201).json(note);
  });
};

module.exports.updateNote = (req, res) => {
  Note.updateNote(req.params.id, req.body.text, (err, note) => {
    if (err) {
      console.log("Update note error : " + err);
      res.status(200).send(err);
    } else res.status(200).json(note);
  });
};

module.exports.deleteNote = (req, res) => {
  Note.deleteNote(req.params.id, (err, note) => {
    if (err) {
      console.log("Delete note error : " + err);
      res.status(200).send(err);
    } else res.status(200).json(note);
  });
};
