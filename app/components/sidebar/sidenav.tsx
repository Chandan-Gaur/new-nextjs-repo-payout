"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import List from "@mui/material/List";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import DatasetIcon from "@mui/icons-material/Dataset";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { Box } from "@mui/material";
import justapay from "../../assets/justapay.webp";
import Allmerechants from "./components/sidebarallmerechants";
import Alltransactions from "./components/sidebaralltransactions";
import Appbar from "./components/appbar";
import { Drawer, DrawerHeader } from "./components/drawerheader";

export default function MiniDrawer(props: {
  userType: string;
  username: string;
}) {
  //console.log(props.userType);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [collapseopen, setcollapseOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setcollapseOpen(!collapseopen);
  };
  return (
    <div>
      <Appbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        username={props.username}
        userType={props.userType}
      />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiPaper-root": {
            background: "#00416A",
          },
        }}
        PaperProps={{
          elevation: 1,
          sx: {
            color: "white",
            fontWeight: "bold",
          },
        }}
      >
        <DrawerHeader>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
            }}
          >
            <Image src={justapay} width={200} height={200} alt={""} />
          </Box>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#fff" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              href="/"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DatasetIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText
                primary="Dash Board"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {props.userType == "sub-admin" ? (
            <Allmerechants open={open} />
          ) : (
            <Alltransactions open={open} />
          )}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              href="/"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <BeenhereIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText
                primary="Success History"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              href="/"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GppMaybeIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText
                primary="Failed History"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              href="/"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PendingActionsIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText
                primary="Pending History"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* <List disablePadding>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              ml: open ? 0.5 : 5.65,
            }}
            onClick={handleOpen}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {collapseopen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={collapseopen} timeout="auto" unmountOnExit>
            <ListItemButton
              href="/"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 2,
                  ml: open ? 2 : 4.5,
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <PeopleIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Merchant User's" />
            </ListItemButton>
          </Collapse>
        </List> */}
      </Drawer>
    </div>
  );
}
