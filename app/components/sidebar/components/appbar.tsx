import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Box, styled } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsMenu from "../../settingscomponent/appbarsettings";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

const Appbar = ({
  open,
  handleDrawerOpen,
  username,
  userType,
}: {
  open: boolean;
  handleDrawerOpen: () => void;
  username: string;
  userType: string;
}) => {
  return (
    <AppBar position="fixed" open={open} sx={{ background: "#00416A" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {userType === "sub-admin"
            ? " company user - " + username
            : userType === "merchant"
            ? "merchant " + username
            : userType}
        </Typography>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              alignContent: "end",
              justifyContent: "end",
              alignItems: "end",
            },
          }}
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <SettingsMenu />
          {/* <IconButton size="large" edge="end" sx={{ color: "#fff" }}>
            <LogoutButton />
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
