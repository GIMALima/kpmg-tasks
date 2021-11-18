import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Typography from "@mui/material/Typography";
import { Box, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { addTask, getTasks, updateTask } from "../../../actions/task.actions";
import { NEW_STATE } from "../../../Constants";

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

export default function TaskForm({ popup, setPopup, task, edit }) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  watch("title");
  watch("description");
  watch("deadline");

  const [description, setDescription] = useState(edit ? task.description : "");
  const [title, setTitle] = useState(edit ? task.title : "");
  const [deadline, setDeadline] = useState(edit ? task.deadline : new Date());
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleClose = () => {
    setPopup(false);
  };

  const handleValidation = () => {
    return errors?.title
      ? errors.title.message
      : errors?.description
      ? errors.description.message
      : errors?.deadline
      ? errors.deadline.message
      : "";
  };

  const handleTask = async (taskData) => {
    taskData.deadline = deadline;
    taskData.creator = userData.id;
    taskData.state = NEW_STATE;

    await dispatch(!edit ? addTask(taskData) : updateTask(task.id, taskData));
    dispatch(getTasks(userData.id));

    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDeadline(new Date());
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={popup}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {!edit ? "Create new task" : "Edit task"}
        </BootstrapDialogTitle>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleTask)}
          sx={{ mt: 3 }}
        >
          <DialogContent dividers>
            <Grid container spacing={2}>
              {handleValidation() && (
                <>
                  <Grid item xs={12} sm={2}></Grid>
                  <Grid item xs={12} sm={10}>
                    <Typography className="error">
                      {handleValidation()}
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={2}>
                <Typography style={{ textAlign: "right" }}>Title</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  {...register("title", {
                    required: "You must enter a title",
                  })}
                  fullWidth
                  name="title"
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography style={{ textAlign: "right" }}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextareaAutosize
                  {...register("description", {
                    required: "You must enter a description",
                  })}
                  aria-label="minimum height"
                  minRows={10}
                  style={{ width: "100%" }}
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography style={{ textAlign: "right" }}>Deadline</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    {...register("deadline", {
                      required: "You must enter a deadline",
                    })}
                    inputFormat="dd/MM/yyyy"
                    value={deadline}
                    onChange={(newDeadline) => setDeadline(newDeadline)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
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
              }}
            >
              {!edit ? "Create" : "Update"}
            </button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </div>
  );
}
