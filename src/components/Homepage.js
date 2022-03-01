import * as React from "react";
import AppBar from "./AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuList from "./HomePageList";
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="Homepage.js">
        GroupUp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const groupImage = require("./../images/hest.png");

export default function Homepage() {
  let navigate = useNavigate();

  React.useEffect(() => {
    let tokenSession = window.sessionStorage.getItem("token");
    let tokenLocal = window.localStorage.getItem("token");
    if (!tokenSession && !tokenLocal) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar></AppBar>
      </Box>
      <main style={{ display: "flex" }}>
        {/* Hero unit */}
        <MenuList />
        <Box style={{ width: "65%" }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="primary.dark"
                gutterBottom
              >
                GroupUp
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 0 }} maxWidth="md">
            {/* End hero unit */}
            <Typography
              component="h1"
              variant="h4"
              // align="center"
              color="text.primary"
              paragraph
            >
              Anbefalte grupper:
            </Typography>
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    onClick={() => {
                      alert("klikk");
                    }}
                    style={{ cursor: "pointer", border: "2px solid" }}
                    variant="outlined"
                    sx={{ bgcolor: "text.main", p: 1 }}
                  >
                    <CardMedia
                      component="img"
                      image={groupImage}
                      // alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        <b>Gruppenavn</b>
                      </Typography>
                      <Typography>
                        Her skal det stå litt info om gruppen.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          GroupUp
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Connecting students since 2022
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
