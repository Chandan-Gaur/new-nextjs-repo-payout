"use client";
import React from "react";
import MiniDrawer from "../components/sidebar/sidenav";
import { Box, CssBaseline } from "@mui/material";
import MerchantDataTable from "./components/merchants_data";
import { useSession } from "next-auth/react";
import LoadingPage from "../components/loadingpage/loadingpage";
const PageallMerchants = () => {
  const { data: session, status } = useSession();
  return session && session.user.token && status == "authenticated" ? (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer
        userType={session.user.token.userType}
        username={session?.user.token.username}
      />
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          mt: 7,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MerchantDataTable
          varToken={session?.user.token.token}
          role={session?.user.token.userType}
          username={session?.user.token.username}
        />
      </Box>
    </Box>
  ) : (
    <LoadingPage />
  );
  // console.log(token);
};
export default PageallMerchants;
