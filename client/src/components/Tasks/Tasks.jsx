import * as React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import "./Tasks.css";
import Task from "../Task/Task";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Tasks() {
  const tasks = useSelector((state) => state.taskReducer);

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
                  New Tasks <span className="tasks__count">7</span>
                </ListItemText>
              </ListItem>
              {Array.isArray(tasks) &&
                tasks.map((task) => <Task key={task.id} task={task} />)}
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
                  In progress <span className="tasks__count">3</span>
                </ListItemText>
              </ListItem>
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
                  To review <span className="tasks__count">2</span>
                </ListItemText>
              </ListItem>
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
                  Completed <span className="tasks__count">2</span>
                </ListItemText>
              </ListItem>
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
