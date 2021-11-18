import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import cookie from "js-cookie";
import StateFilter from "../StateFilter/StateFilter";

const MainListItems = ({ selectedState, setSelectedState }) => {
  const [profile, setProfile] = useState(false);
  const [filter, setFilter] = useState(false);

  const handleOpenProfile = () => setProfile(!profile);
  const handleOpenFilter = () => setFilter(!filter);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const handleLogout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div>
      <NavLink exact to="/">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>
      <ListItem button>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItem>
      <ListItem button onClick={handleOpenFilter}>
        <ListItemIcon>
          <FilterAltIcon />
        </ListItemIcon>
        <ListItemText primary="Filter" />
        {filter ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={filter} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <StateFilter
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
        </List>
      </Collapse>
      <ListItem button onClick={handleOpenProfile}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
        {profile ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={profile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button sx={{ pl: 4 }} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default MainListItems;
