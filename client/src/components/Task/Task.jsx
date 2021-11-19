import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SendIcon from "@mui/icons-material/Send";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import UploadSolution from "../UploadSolution/UploadSolution";
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

const Task = ({ task }) => {
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

  const handleDisapproveTask = () =>
    dispatch(updateTaskState(task.id, PROGRESS_STATE));

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
    switch (task.state) {
      case NEW_STATE:
        return "#8EE1EA";

      case PROGRESS_STATE:
        return "#C55494";

      case REVIEW_STATE:
        return "#D8C923";

      case COMPLETED_STATE:
        return "#0693e3";

      default:
        return "#8EE1EA";
    }
  };

  const downloadSolution = () =>
    saveAs("./uploads/solutions/" + task.solution, task.solution);

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
              <Tooltip title="Edit task">
                <IconButton aria-label="edit" onClick={handleEditTask}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete task">
                <IconButton aria-label="delete" onClick={handleDeleteTask}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )
        }
        title={task.title}
        subheader={
          <>
            <Tooltip title="Due date">
              <CalendarTodayIcon className="task__icon" />
            </Tooltip>
            <Tooltip title="Due date">
              <span>
                {typeof task.deadline === "string" &&
                  task.deadline.substring(0, 10)}
              </span>
            </Tooltip>
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
        <Tooltip title="Add note">
          <IconButton onClick={handleNote}>
            <span style={{ fontSize: "16px", padding: "0 6px" }}>
              {Array.isArray(taskNotes) && taskNotes.length}
            </span>
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Tooltip>
        {currentUser.profile === "DZ" && !task.solution && (
          <UploadSolution key={task.id} task={task} />
        )}
        {task.solution && (
          <Tooltip title={"Download solution " + task.solution}>
            <IconButton onClick={downloadSolution}>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
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
          <>
            <Tooltip title="Send remarks">
              <IconButton aria-label="edit" onClick={handleDisapproveTask}>
                <SendIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Approve solution">
              <Button
                onClick={handleApproveTask}
                variant="contained"
                style={{ marginLeft: "auto", backgroundColor: getColor() }}
              >
                Approve
              </Button>
            </Tooltip>
          </>
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
};

export default Task;
