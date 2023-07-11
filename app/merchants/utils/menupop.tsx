"use client";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { updatestatus_merchant, updatestatus_user } from "@/app/Service/Api";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Box, Chip } from "@mui/material";
import { useSession } from "next-auth/react";

export function CustomizedMenus(value: any) {
  const { data: session, status } = useSession();
  let token = session?.user.token.token;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handle_allow = async () => {
    if (token != "" && token != undefined) {
      try {
        if (
          value.value.withdrawal_id != undefined &&
          value.value.withdrawal_id != null
        ) {
          const result = await updatestatus_user(
            token,
            value.value.withdrawal_id,
            "Allow"
          );
        } else {
          const result = await updatestatus_merchant(
            token,
            value.value._id,
            "Allow"
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleClose();
    window.location.reload();
  };
  // //
  const handle_pending = async () => {
    if (token != undefined && token != null) {
      try {
        if (
          value.value.withdrawal_id != undefined &&
          value.value.withdrawal_id != null
        ) {
          const result = await updatestatus_user(
            token,
            value.value.withdrawal_id,
            "Pending"
          );
          if (result != "error" && result.length > 0) {
          }
        } else {
          const result = await updatestatus_merchant(
            token,
            value.value._id,
            "Pending"
          );
          if (result != "error" && result.length > 0) {
            console.log(result);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleClose();
    window.location.reload();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{ display: "flex", alignItems: "left", justifyContent: "center" }}
      >
        <Chip
          aria-controls="dropdown-menu"
          label="Options"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ backgroundColor: "#AA87D5", color: "white" }}
        />

        <Menu
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handle_allow()}>Allow</MenuItem>
          <MenuItem onClick={() => handle_pending()}>Pending</MenuItem>
        </Menu>
      </Box>
    </ClickAwayListener>
  );
}
