import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import Note from "../Note/Note";
import { useDispatch, useSelector } from "react-redux";
import NoteForm from "../Note/Form/Form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Notes({ notePopup, setNotePopup, notes, task }) {
  const handleClose = () => {
    setNotePopup(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={notePopup}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        style={{ backgroundColor: "#fafbfc" }}
      >
        <NoteForm task={task} />
        <List
          sx={{
            width: "100%",
            maxWidth: 600,
            bgcolor: "#fafbfc",
            mt: "10px",
          }}
        >
          {Array.isArray(notes) &&
            notes.map((note) => <Note key={note.id} note={note} />)}
        </List>
      </BootstrapDialogTitle>
    </BootstrapDialog>
  );
}
