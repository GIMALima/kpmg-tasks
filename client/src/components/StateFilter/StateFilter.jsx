import React from "react";
import { Box, List, ListItemButton } from "@mui/material";
import {
  NEW_STATE,
  PROGRESS_STATE,
  REVIEW_STATE,
  COMPLETED_STATE,
} from "../../Constants";
import "./StateFilter.css";

const StateFilter = ({ selectedState, setSelectedState }) => {
  const handleListItemClick = (event, state) => setSelectedState(state);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedState === "all"}
          onClick={(event) => handleListItemClick(event, "all")}
        >
          <span
            className="stateFilter__state"
            style={{ marginRight: "35px" }}
          ></span>
          All
        </ListItemButton>
        <ListItemButton
          selected={selectedState === NEW_STATE}
          onClick={(event) => handleListItemClick(event, NEW_STATE)}
        >
          <span
            className="stateFilter__state"
            style={{ backgroundColor: "#8EE1EA", marginRight: "35px" }}
          ></span>
          New
        </ListItemButton>
        <ListItemButton
          selected={selectedState === PROGRESS_STATE}
          onClick={(event) => handleListItemClick(event, PROGRESS_STATE)}
        >
          <span
            className="stateFilter__state"
            style={{ backgroundColor: "#C55494", marginRight: "35px" }}
          ></span>
          In progress
        </ListItemButton>
        <ListItemButton
          selected={selectedState === REVIEW_STATE}
          onClick={(event) => handleListItemClick(event, REVIEW_STATE)}
        >
          <span
            className="stateFilter__state"
            style={{ backgroundColor: "#D8C923", marginRight: "35px" }}
          ></span>
          To review
        </ListItemButton>
        <ListItemButton
          selected={selectedState === COMPLETED_STATE}
          onClick={(event) => handleListItemClick(event, COMPLETED_STATE)}
        >
          <span
            className="stateFilter__state"
            style={{ backgroundColor: "#0693e3", marginRight: "35px" }}
          ></span>
          Completed
        </ListItemButton>
      </List>
    </Box>
  );
};

export default StateFilter;
