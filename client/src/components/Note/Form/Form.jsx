import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, TextareaAutosize } from "@mui/material";
import { addNote, getNotes } from "../../../actions/note.actions";
import { useForm } from "react-hook-form";

export default function NoteForm({ task }) {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  watch("text");

  const handleValidation = () => {
    return errors?.text ? errors.text.message : "";
  };

  const handleNote = async (noteData) => {
    noteData.creator = userData.id;
    noteData.task = task.id;

    await dispatch(addNote(noteData));

    resetForm();
  };

  const resetForm = () => {
    setText("");
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleNote)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={112}>
          {handleValidation() && (
            <Grid item xs={12} sm={10}>
              <Typography className="error">{handleValidation()}</Typography>
            </Grid>
          )}
          <TextareaAutosize
            {...register("text", {
              required: "You must enter a note",
            })}
            minRows={3}
            style={{
              width: "100%",
              borderRadius: "6px",
              border: "none",
              padding: "16px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.14)",
            }}
            name="text"
            value={text}
            placeholder="Leave a note..."
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <button
          type="submit"
          style={{
            backgroundColor: "#0693e3",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            fontSize: "14px",
            padding: "8px 12px",
            textTransform: "capitalize",
            marginLeft: "auto",
            marginTop: "10px",
          }}
        >
          Add note
        </button>
      </Grid>
    </Box>
  );
}
