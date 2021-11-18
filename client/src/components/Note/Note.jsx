import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./Note.css";

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

export default function Note({ note }) {
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
          <span className="note__user">
            {noteUser && noteUser.firstname + " " + noteUser.lastname}
          </span>
          <span className="note__date">
            {noteUser && note.created_at.substring(0, 10)}
            {" at "}
            {noteUser && note.created_at.substring(11, 16)}
          </span>
        </Typography>
        <div style={{ display: "flex" }}>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
            style={{ textAlign: "justify" }}
          >
            {!expanded && note.text.substring(0, 100)}
          </Typography>
          {note.text.length > 100 && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <MoreHorizIcon />
            </ExpandMore>
          )}
        </div>
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
      </div>
    </ListItem>
  );
}
