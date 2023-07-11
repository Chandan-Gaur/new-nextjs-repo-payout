import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import PeopleIcon from "@mui/icons-material/People";
const SidebarAllmerechants = (open: { open: boolean }) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
    <ListItemButton
      href="/merchants"
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
        <PeopleIcon sx={{ color: "#fff" }} />
      </ListItemIcon>
      <ListItemText primary="All Merchants" sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
    </ListItem>
  );
};

export default SidebarAllmerechants;
