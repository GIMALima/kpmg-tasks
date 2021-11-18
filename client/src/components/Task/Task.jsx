import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadSolution from "../UploadSolution/UploadSolution";
import { useDispatch, useSelector } from "react-redux";
import Notes from "../Notes/Notes";
import {
  deleteTask,
  updateTaskState,
  assignTask,
} from "../../actions/task.actions";
import {
  NEW_STATE,
  REQUEST_STATE,
  PROGRESS_STATE,
  REVIEW_STATE,
  COMPLETED_STATE,
} from "../../Constants";
import TaskForm from "../Task/Form/Form";
import "./Task.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Task({ task }) {
  const notes = useSelector((state) => state.noteReducer);
  const [expanded, setExpanded] = useState(false);
  const [popup, setPopup] = useState(false);
  const [notePopup, setNotePopup] = useState(false);
  const [taskUser, setTaskUser] = useState(null);
  const [taskNotes, setTaskNotes] = useState(null);
  const currentUser = useSelector((state) => state.userReducer);
  const users = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const handleExpandClick = () => setExpanded(!expanded);

  const handleDeleteTask = () => dispatch(deleteTask(task.id));

  const handleEditTask = () => setPopup(true);

  const handleSendRequest = () =>
    dispatch(updateTaskState(task.id, REQUEST_STATE));

  const handleAssignTask = () =>
    dispatch(assignTask(task.id, currentUser.id, PROGRESS_STATE));

  const handleApproveTask = () =>
    dispatch(updateTaskState(task.id, COMPLETED_STATE));

  const handleNote = () => setNotePopup(true);

  useEffect(() => {
    const userId = currentUser.profile === "DZ" ? task.creator : task.assignee;
    let u =
      Array.isArray(users) &&
      users.filter((user) => {
        return user.id === userId;
      })[0];
    setTaskUser(u);

    const taskNotes =
      Array.isArray(notes) &&
      notes.filter((note) => {
        return note.task === task.id;
      });
    setTaskNotes(taskNotes);
  }, [notes]);

  const getColor = () => {
    return task.state === NEW_STATE
      ? "#8EE1EA"
      : task.state === PROGRESS_STATE
      ? "#C55494"
      : task.state === REVIEW_STATE
      ? "#D8C923"
      : task.state === COMPLETED_STATE
      ? "#0693e3"
      : "#8EE1EA";
  };

  return (
    <Card sx={{ maxWidth: "100%", marginTop: "15px" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            alt={
              currentUser && currentUser.firstname + " " + currentUser.lastname
            }
            src="/assets"
          ></Avatar>
        }
        action={
          currentUser.profile === "FR" &&
          task.state === NEW_STATE && (
            <>
              <IconButton aria-label="edit" onClick={handleEditTask}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDeleteTask}>
                <DeleteIcon />
              </IconButton>
            </>
          )
        }
        title={task.title}
        subheader={
          <>
            <CalendarTodayIcon className="task__icon" />
            <span>
              {typeof task.deadline === "string" &&
                task.deadline.substring(0, 10)}
            </span>
          </>
        }
      />

      {taskUser && (
        <Typography style={{ paddingLeft: "16px" }}>
          {currentUser.profile === "DZ" ? "Creator: " : "Assignee: "}
          <span style={{ color: getColor() }}>
            @{taskUser.firstname + " " + taskUser.lastname}
          </span>
        </Typography>
      )}

      <CardContent>
        <Typography
          style={{ textAlign: "justify" }}
          paragraph
          color="text.secondary"
        >
          {!expanded && task.description.substring(0, 100)}
          {task.description.length > 100 && (
            <>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{task.description}</Typography>
                </CardContent>
              </Collapse>
            </>
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add note" onClick={handleNote}>
          <span style={{ fontSize: "16px", padding: "0 6px" }}>
            {Array.isArray(taskNotes) && taskNotes.length}
          </span>
          <ChatBubbleOutlineIcon />
        </IconButton>
        {currentUser.profile === "DZ" && !task.solution && (
          <UploadSolution key={task.id} task={task} />
        )}
        {task.solution && (
          <IconButton aria-label="Download solution">
            <FileDownloadIcon />
          </IconButton>
        )}
        {currentUser.profile === "FR" && task.state === NEW_STATE && (
          <Button
            variant="contained"
            style={{ marginLeft: "auto", backgroundColor: getColor() }}
            onClick={handleSendRequest}
          >
            Send Request
          </Button>
        )}
        {currentUser.profile === "FR" && task.state === REQUEST_STATE && (
          <Button variant="contained" style={{ marginLeft: "auto" }} disabled>
            Request sent
          </Button>
        )}
        {currentUser.profile === "DZ" && task.state === REQUEST_STATE && (
          <Button
            variant="contained"
            style={{ marginLeft: "auto", backgroundColor: getColor() }}
            onClick={handleAssignTask}
          >
            Assign
          </Button>
        )}
        {currentUser.profile === "FR" && task.state === REVIEW_STATE && (
          <Button
            onClick={handleApproveTask}
            variant="contained"
            style={{ marginLeft: "auto", backgroundColor: getColor() }}
          >
            Approve
          </Button>
        )}
      </CardActions>
      <Notes
        notePopup={notePopup}
        setNotePopup={setNotePopup}
        notes={taskNotes}
        task={task}
      />
      <TaskForm popup={popup} setPopup={setPopup} task={task} edit={true} />
    </Card>
  );
}
