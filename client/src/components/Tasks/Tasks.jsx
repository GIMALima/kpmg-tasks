import * as React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Task from "../Task/Task";
import "./Tasks.css";
import {
  COMPLETED_STATE,
  NEW_STATE,
  REQUEST_STATE,
  PROGRESS_STATE,
  REVIEW_STATE,
} from "../../Constants";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Tasks() {
  const tasks = useSelector((state) => state.taskReducer);
  const newRequests = useSelector((state) => state.tasksReducer);
  const userData = useSelector((state) => state.userReducer);

  let requests = null;
  let progress = null;
  let review = null;
  let completed = null;

  if (Array.isArray(tasks)) {
    requests =
      userData.profile === "FR"
        ? tasks.filter(
            (task) => task.state === NEW_STATE || task.state === REQUEST_STATE
          )
        : newRequests;

    progress =
      Array.isArray(tasks) &&
      tasks.filter((task) => task.state === PROGRESS_STATE);
    review =
      Array.isArray(tasks) &&
      tasks.filter((task) => task.state === REVIEW_STATE);
    completed =
      Array.isArray(tasks) &&
      tasks.filter((task) => task.state === COMPLETED_STATE);
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Demo>
            <List
              style={{
                borderTop: "2px solid #8EE1EA",
                backgroundColor: "#f5f5f5",
              }}
            >
              <ListItem>
                <ListItemText>
                  New Tasks{" "}
                  <span className="tasks__count">
                    {requests && requests.length}
                  </span>
                </ListItemText>
              </ListItem>
              {requests &&
                requests.map((task) => <Task key={task.id} task={task} />)}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={12} md={3}>
          <Demo>
            <List
              style={{
                borderTop: "2px solid #C55494",
                backgroundColor: "#f5f5f5",
              }}
            >
              <ListItem>
                <ListItemText>
                  In progress{" "}
                  <span className="tasks__count">
                    {progress && progress.length}
                  </span>
                </ListItemText>
              </ListItem>
              {progress &&
                progress.map((task) => <Task key={task.id} task={task} />)}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={12} md={3}>
          <Demo>
            <List
              style={{
                borderTop: "2px solid #D8C923",
                backgroundColor: "#f5f5f5",
              }}
            >
              <ListItem>
                <ListItemText>
                  To review{" "}
                  <span className="tasks__count">
                    {review && review.length}
                  </span>
                </ListItemText>
              </ListItem>
              {review &&
                review.map((task) => <Task key={task.id} task={task} />)}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={12} md={3}>
          <Demo>
            <List
              style={{
                borderTop: "2px solid #0693e3",
                backgroundColor: "#f5f5f5",
              }}
            >
              <ListItem>
                <ListItemText>
                  Completed{" "}
                  <span className="tasks__count">
                    {completed && completed.length}
                  </span>
                </ListItemText>
              </ListItem>
              {completed &&
                completed.map((task) => <Task key={task.id} task={task} />)}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
