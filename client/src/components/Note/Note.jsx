import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ActionMenu from "./ActionsMenu/ActionMenu";
import "./Note.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Note = ({ note, setEditNote }) => {
  const users = useSelector((state) => state.usersReducer);
  const currentUser = useSelector((state) => state.userReducer);
  const [noteUser, setNoteUser] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const getColor = () => {
    return currentUser && noteUser && currentUser.id === noteUser.id
      ? "red"
      : "#0693e3";
  };

  const handleExpandClick = () => setExpanded(!expanded);

  useEffect(() => {
    let user =
      Array.isArray(users) &&
      users.filter((user) => {
        return user.id === note.creator;
      })[0];
    setNoteUser(user);
  }, [dispatch]);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          style={{ backgroundColor: getColor() }}
          alt={noteUser && noteUser.firstname + " " + noteUser.lastname}
          src="/assets"
        />
      </ListItemAvatar>
      <div className="note">
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body2"
          color="text.primary"
          style={{ marginBottom: "5px" }}
        >
          <div style={{ display: "flex" }}>
            <span className="note__user">
              {noteUser && noteUser.firstname + " " + noteUser.lastname}
            </span>
            <span className="note__date">
              {noteUser && note.created_at.substring(0, 10)}
              {" at "}
              {noteUser && note.created_at.substring(11, 16)}
            </span>
            {currentUser && noteUser && currentUser.id === noteUser.id && (
              <ActionMenu key={note.id} note={note} setEditNote={setEditNote} />
            )}
          </div>
        </Typography>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body2"
          color="text.primary"
          style={{ textAlign: "justify" }}
        >
          {!expanded && note.text.substring(0, 200)}
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
            style={{ textAlign: "justify" }}
          >
            {note.text}
          </Typography>
        </Collapse>
        {note.text.length > 200 && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <span style={{ fontSize: "14px", padding: "5px" }}>
              {!expanded ? "Show more" : "Show less"}
            </span>
          </ExpandMore>
        )}
      </div>
    </ListItem>
  );
};

export default Note;
