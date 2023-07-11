import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import PaymentIcon from '@mui/icons-material/Payment';
const SidebarAlltransactions = (open: { open: boolean }) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
    <ListItemButton
      href="/viewtransactions/all"
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
        <PaymentIcon sx={{ color: "#fff" }} />
      </ListItemIcon>
      <ListItemText primary="All Transactions" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
      </ListItem>
  );
};

export default SidebarAlltransactions;
