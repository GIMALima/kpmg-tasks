import * as React from "react";
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
import { useDispatch } from "react-redux";
import { deleteTask } from "../../actions/task.actions";
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
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
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
          <>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeleteTask}>
              <DeleteIcon />
            </IconButton>
          </>
        }
        title={task.title}
        subheader={
          <>
            <CalendarTodayIcon className="task__icon" />
            <span>{task.deadline}</span>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
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
        <IconButton aria-label="Upload solution">
          <FileUploadIcon />
        </IconButton>
        <IconButton aria-label="Download solution">
          <FileDownloadIcon />
        </IconButton>
        <Button variant="contained" style={{ marginLeft: "auto" }}>
          Send
        </Button>
      </CardActions>
    </Card>
  );
}
