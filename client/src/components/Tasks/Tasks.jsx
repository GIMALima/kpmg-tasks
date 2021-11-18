import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
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

export default function Tasks({ setPopup, selectedState }) {
  const tasks = useSelector((state) => state.taskReducer);
  const newRequests = useSelector((state) => state.tasksReducer);
  const userData = useSelector((state) => state.userReducer);
  const [requests, setRequests] = useState(null);
  const [progress, setProgress] = useState(null);
  const [review, setReview] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [count, setCount] = useState(4);

  const handleClick = () => setPopup(true);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      const reqs =
        selectedState === "all" || selectedState === NEW_STATE
          ? userData.profile === "FR"
            ? tasks.filter(
                (task) =>
                  task.state === NEW_STATE || task.state === REQUEST_STATE
              )
            : newRequests
          : null;
      setRequests(reqs);

      const prog =
        selectedState === "all" || selectedState === PROGRESS_STATE
          ? tasks.filter((task) => task.state === PROGRESS_STATE)
          : null;
      setProgress(prog);

      const rev =
        selectedState === "all" || selectedState === REVIEW_STATE
          ? tasks.filter((task) => task.state === REVIEW_STATE)
          : null;
      setReview(rev);

      const comp =
        selectedState === "all" || selectedState === COMPLETED_STATE
          ? tasks.filter((task) => task.state === COMPLETED_STATE)
          : null;
      setCompleted(comp);

      selectedState != "all" ? setCount(1) : setCount(4);
    }
  }, [selectedState, tasks]);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={count}>
        {requests && (
          <Grid item xs={12} md={12 / count}>
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
                    <span className="tasks__count">{requests.length}</span>
                  </ListItemText>
                </ListItem>
                {requests.length == 0 && count != 4 && (
                  <div style={{ paddingTop: "10px" }}>
                    There is no new request
                  </div>
                )}
                {requests.map((task) => (
                  <Task key={task.id} task={task} />
                ))}

                {userData.profile === "FR" && (
                  <Button
                    onClick={handleClick}
                    variant="text"
                    style={{ color: "rgba(0, 0, 0, 0.26)", marginTop: "20px" }}
                    startIcon={
                      <AddIcon style={{ color: "rgba(0, 0, 0, 0.26)" }} />
                    }
                  >
                    New Task
                  </Button>
                )}
              </List>
            </Demo>
          </Grid>
        )}
        {progress && (
          <Grid item xs={12} md={12 / count}>
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
                    <span className="tasks__count">{progress.length}</span>
                  </ListItemText>
                </ListItem>
                {progress.length == 0 && count != 4 && (
                  <div style={{ paddingTop: "10px" }}>
                    No task is in progress
                  </div>
                )}
                {progress.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </List>
            </Demo>
          </Grid>
        )}
        {review && (
          <Grid item xs={12} md={12 / count}>
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
                    <span className="tasks__count">{review.length}</span>
                  </ListItemText>
                </ListItem>
                {review.length == 0 && count != 4 && (
                  <div style={{ paddingTop: "10px" }}>No task is in review</div>
                )}
                {review.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </List>
            </Demo>
          </Grid>
        )}
        {completed && (
          <Grid item xs={12} md={12 / count}>
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
                    <span className="tasks__count">{completed.length}</span>
                  </ListItemText>
                </ListItem>
                {completed.length == 0 && count != 4 && (
                  <div style={{ paddingTop: "10px" }}>
                    No task was completed
                  </div>
                )}
                {completed.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </List>
            </Demo>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
