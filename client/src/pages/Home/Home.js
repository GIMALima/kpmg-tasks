import { useContext, useState } from "react";
import { UidContext } from "../../AppContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Sidebar/Sidebar";
import AppBar from "../../components/AppBar/AppBar";
import Login from "../Login/Login";

const mdTheme = createTheme();

const Home = () => {
  const uid = useContext(UidContext);
  const [popup, setPopup] = useState(false);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {uid ? (
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              popup={popup}
              setPopup={setPopup}
              open={open}
              toggleDrawer={toggleDrawer}
            />
            <Sidebar
              setPopup={setPopup}
              open={open}
              toggleDrawer={toggleDrawer}
            />
          </Box>
        </ThemeProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
