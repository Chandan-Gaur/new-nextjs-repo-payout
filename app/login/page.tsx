"use client";
import {
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import outerTheme from "../theme/theme";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import LoadingPage from "../components/loadingpage/loadingpage";
import { useRouter } from "next/navigation";
// user logged in component now ----------------------------------------------------------------
export default function SignIn() {
  // functions now --------------------------------
  const { data: session, status } = useSession();
  const [error, seterror] = useState("");
  const router = useRouter();
  // let error: any = null;
  let loading: any = false;
  // console.log(session?.user.token);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    try {
      loading = true;
      const error_res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (error_res?.error) {
        seterror("Email Id or Password Not Correct");
        console.log(error_res);
      } else {
        loading = true;
        router.push("/");
      }
      setTimeout(() => {
        seterror("");
      }, 3000);
    } catch (err) {
      loading = false;
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={outerTheme}>
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        <Container component="main" maxWidth="xs">
          {error != "" && <Alert severity="error">{error}</Alert>}
          {loading != false ? (
            <LoadingPage />
          ) : status == "unauthenticated" && loading == false ? (
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-pasord"
                />
                <br />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
                  </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ) : (
            <LoadingPage />
          )}
        </Container>
      </main>
    </ThemeProvider>
  );
}
// user logged in component now ----------------------------------------------------------------
