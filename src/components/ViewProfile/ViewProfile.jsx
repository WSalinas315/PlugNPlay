import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Card, Typography, Button, ButtonGroup, Link } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import "./ViewProfile.css";
import LogOutButton from "../LogOutButton/LogOutButton";
import ProfileBartleType from "../ProfileBartleType/ProfileBartleType";

function ViewProfile() {
  // Pull user information from store
  const user = useSelector((store) => store.user);
  const userLists = useSelector((store) => store.userLists);

  // Initialize history
  const history = useHistory();

  // initialize dispatch
  const dispatch = useDispatch();

  // fetches user's wishlist from database
  useEffect(() => {
    dispatch({ type: "USER/FETCH_ALL_LISTS" });
  }, []);

  const handleAdminClick = () => {
    history.push("/admin");
  };

  const buttonStyling = {
    color: "#C02222",
    border: "solid 2px",
    borderRadius: "10px",
    height: "36px",
    width: "36px",  
  }

  const SettingsButton = () => {
    return (
      <Button
        onClick={() => history.push('/settings')}
        sx={{ border: "transparent" }}>
        <SettingsIcon
          sx={buttonStyling}
        />
      </Button>
    );
  };

  const OptionButtons = () => {
    return user.access_level == 1 ? (
      <ButtonGroup>
        <SettingsButton />
        <Button
          sx={{ border: "transparent", select: "#ffffff" }}
          onClick={handleAdminClick}
        >
          <AdminPanelSettingsIcon
            sx={buttonStyling}
          />
        </Button>
      </ButtonGroup>
    ) : (
      <SettingsButton />
    );
  };

  return (
    <div>

      {/* Player Profile Card */}
      <Card sx={{ textAlign: "center", border: "1px solid #C02222" }}>
      <div className="corner-buttons">
        <OptionButtons />
      </div>
        {/* Username */}
        <Typography variant="h1">{user.username}</Typography>
        {/* Profile picture or default profile image */}
        <img className="profile_img" src={user.profile_img_path || 'images/default.png'} />
        <div className="two-column-grid">
          {/* Games played count */}
          <Typography className="grid-left" variant="h3">
            Played Games:
          </Typography>
          <Typography className="grid-right" variant="h3">
            {userLists.userPlayedList.length}
          </Typography>
          {/* Wishlisted games count */}
          <Typography className="grid-left" variant="h3">
            Games on Wishlist:
          </Typography>
          <Typography className="grid-right" variant="h3">
            {userLists.userPlayedList.length}
          </Typography>
          {/* Bartle Player Type */}
          {/* <ProfileBartleType /> */}
          <Typography className="grid-left" variant="h3">
            Player Type:
          </Typography>
          <Typography className="grid-right" variant="h3">
            Killer (Placeholder)
          </Typography>
        </div>
        <LogOutButton />
      </Card>
    </div>
  );
}
export default ViewProfile;
