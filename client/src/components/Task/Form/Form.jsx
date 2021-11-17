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
import { addTask, getTasks } from "../../../actions/task.actions";

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

export default function TaskForm({ popup, setPopup }) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  watch("title");
  watch("description");
  watch("deadline");

  const [deadline, setDeadline] = useState(new Date());
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.taskError);
  const dispatch = useDispatch();

  const handleClose = () => {
    setPopup(false);
  };

  const handleChange = (deadline) => {
    setDeadline(deadline);
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

  const handleCreate = async (taskData) => {
    taskData.creator = userData.id;
    taskData.state = "new";

    await dispatch(addTask(taskData));
    dispatch(getTasks(userData.id));
    reset();
    handleClose();
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
          Create new task
        </BootstrapDialogTitle>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleCreate)}
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
                    inputFormat="MM/dd/yyyy"
                    value={deadline}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="deadline"
                        fullWidth
                        size="small"
                      />
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
                backgroundColor: "transparent",
                color: "#0693e3",
                border: "none",
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Create
            </button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </div>
  );
}
