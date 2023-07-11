"use client";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
// import Image from "next/image";
import outerTheme from "./theme/theme";
import MiniDrawer from "./components/sidebar/sidenav";
import { useSession } from "next-auth/react";
import SignIn from "./login/page";
import { useEffect, useState } from "react";
import LoadingPage from "./components/loadingpage/loadingpage";
import Dashboard from "./components/dashboard/dashboard";
import { get_dashboard_data } from "./Service/Api";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const [dashboard, setDashboard] = useState(null);
  const router = useRouter();
  console.log(session?.user.token);
  useEffect(() => {
    async function call() {
      try {
        const result = await get_dashboard_data(session?.user.token.token);
        console.log(result);

        if (result !== "error") {
          console.log(result);

          setDashboard(result);
          console.log(dashboard);
        } else {
          console.log("redirecting to /");
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (session && session.user) {
      console.log(session?.user.token.userType);
      call().then(() => {
        console.log("done");
      });
    }
  }, [status, session]);

  return (
    <ThemeProvider theme={outerTheme}>
      {session?.user && status == "authenticated" ? (
        <Box sx={{ display: "flex", backgroundColor: "white" }}>
          <CssBaseline />
          <MiniDrawer
            userType={session.user.token.userType}
            username={session?.user.token.username}
          />
          {dashboard !== null ? (
            <Dashboard dashboard={dashboard} />
          ) : (
            <LoadingPage />
          )}
        </Box>
      ) : status == "loading" ? (
        <LoadingPage />
      ) : (
        status == "unauthenticated" && <SignIn />
      )}
    </ThemeProvider>
  );
}
