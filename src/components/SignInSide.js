import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUpForm from "./SignUpForm";
import { Animated } from "react-animated-css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignInSide() {
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSignInError("Kunne ikke logge inn. Prøv igjen.");
    console.log({
      username: data.get("brukernavn"),
      password: data.get("passord"),
    });
    navigate("/homepage");
  };
  const [signInError, setSignInError] = React.useState("");
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const handleOpenSignUp = () => setSignUpOpen(true);
  const [animationSignIn, setAnimationSignIn] = React.useState("slideInDown");
  const handleCloseSignUp = () => {
    setAnimationSignIn("slideInLeft");
    setSignUpOpen(false);
  };

  // React.useEffect(() => {
  //   alert("najs");
  //   window.sessionStorage.setItem("token", "q23423rjqskjrkew");
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
        <CssBaseline />
        <Grid
          item
          style={{ zIndex: "999999" }}
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?group)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Animated
            animationIn={animationSignIn}
            animationOut="slideOutLeft"
            isVisible={!signUpOpen}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                Logg inn
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: "80%" }}
              >
                <Collapse in={signInError !== ""}>
                  <Alert
                    severity="error"
                    onClose={() => {
                      setSignInError("");
                    }}
                    style={{marginTop: "8px"}}
                  >
                    {signInError}
                  </Alert>
                </Collapse>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="brukernavn"
                  label="Brukernavn"
                  name="brukernavn"
                  autoComplete="username"
                  error={signInError !== ""}
                  autoFocus
                  onChange={() => {setSignInError("")}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passord"
                  label="Passord"
                  type="password"
                  id="passord"
                  autoComplete="current-password"
                  error={signInError !== ""}
                  onChange={() => {setSignInError("")}}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Husk meg"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Logg inn
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                  <Grid item>
                    <Link
                      style={{ cursor: "pointer" }}
                      variant="body2"
                      onClick={() => {
                        setAnimationSignIn("slideInLeft");
                        handleOpenSignUp();
                      }}
                    >
                      {"Har du ikke bruker? Klikk her for å registere deg her"}
                    </Link>
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            </Box>
          </Animated>
          <Animated
            animationIn="slideInRight"
            animationOut="slideOutRight"
            isVisible={signUpOpen}
            animateOnMount={false}
          >
            <div style={{ marginTop: "-462px" }}>
              <SignUpForm handleAbort={handleCloseSignUp}></SignUpForm>
            </div>
          </Animated>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
