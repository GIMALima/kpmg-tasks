import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteNote } from "../../../actions/note.actions";
import "./ActionMenu.css";

export default function ActionMenu({ note, setEditNote }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleDeleteNote = () => dispatch(deleteNote(note.id));

  const handleEditNote = () => setEditNote(note.id);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginLeft: "auto",
        }}
      >
        <Tooltip title="Actions">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <IconButton
            className="actionMenu__iconButton"
            onClick={handleEditNote}
          >
            <EditIcon fontSize="small" className="actionMenu__icon" />
            Edit
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton
            className="actionMenu__iconButton"
            onClick={handleDeleteNote}
          >
            <DeleteIcon fontSize="small" className="actionMenu__icon" />
            Delete
          </IconButton>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
