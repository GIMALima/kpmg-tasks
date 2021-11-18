import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Toolbar, Typography, IconButton, Badge, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import TaskForm from "../Task/Form/Form";
import "./AppBar.css";

const drawerWidth = 240;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({ popup, setPopup, open, toggleDrawer }) => {
  const userData = useSelector((state) => state.userReducer);

  const handleClickOpen = () => setPopup(true);

  return (
    <StyledAppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon style={{ color: "#000" }} />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="#000"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {userData.firstname} Dashboard
        </Typography>
        {userData.profile === "FR" && (
          <Button
            variant="contained"
            startIcon={<AddIcon style={{ color: "#fff" }} />}
            onClick={handleClickOpen}
            className="appBar__button"
          >
            New Task
          </Button>
        )}
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon style={{ color: "#000" }} />
          </Badge>
        </IconButton>
      </Toolbar>
      <TaskForm popup={popup} setPopup={setPopup} edit={false} />
    </StyledAppBar>
  );
};

export default AppBar;
