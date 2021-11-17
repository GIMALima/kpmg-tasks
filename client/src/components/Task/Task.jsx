import React, { useState } from "react";
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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../actions/task.actions";
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
  const [expanded, setExpanded] = React.useState(false);
  const [popup, setPopup] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteTask = () => dispatch(deleteTask(task.id));

  const handleEditTask = () => setPopup(true);

  const buttonColor = () => {
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          userData.profile === "FR" &&
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
      <CardContent>
        <Typography
          style={{ textAlign: "justify" }}
          paragraph
          color="text.secondary"
        >
          {!expanded && task.description.substring(0, 100)}
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
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add note">
          <ChatBubbleOutlineIcon />
        </IconButton>
        {userData.profile === "DZ" && (
          <IconButton aria-label="Upload solution">
            <FileUploadIcon />
          </IconButton>
        )}
        {userData.profile === "FR" && task.solution && (
          <IconButton aria-label="Download solution">
            <FileDownloadIcon />
          </IconButton>
        )}
        {userData.profile === "FR" && task.state === NEW_STATE && (
          <Button
            variant="contained"
            style={{ marginLeft: "auto", backgroundColor: buttonColor() }}
          >
            Send Request
          </Button>
        )}
        {userData.profile === "FR" && task.state === REQUEST_STATE && (
          <Button variant="contained" style={{ marginLeft: "auto" }} disabled>
            Request sent
          </Button>
        )}
        {userData.profile === "DZ" && task.state === REQUEST_STATE && (
          <Button
            variant="contained"
            style={{ marginLeft: "auto", backgroundColor: buttonColor() }}
          >
            Assign
          </Button>
        )}
        {userData.profile === "DZ" && task.state === PROGRESS_STATE && (
          <Button
            variant="contained"
            style={{ marginLeft: "auto", backgroundColor: buttonColor() }}
          >
            Send solution
          </Button>
        )}
        {userData.profile === "FR" && task.state === REVIEW_STATE && (
          <Button
            variant="contained"
            style={{ marginLeft: "auto", backgroundColor: buttonColor() }}
          >
            Approve
          </Button>
        )}
      </CardActions>
      <TaskForm popup={popup} setPopup={setPopup} task={task} edit={true} />
    </Card>
  );
}
