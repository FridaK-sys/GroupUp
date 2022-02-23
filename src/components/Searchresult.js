import * as React from "react";
import AppBar from "./AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuList from "./HomePageList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fontStyle } from "@mui/system";

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

export default function Grouppage() {
  let navigate = useNavigate();
  const getSearch = () => {
    let path = window.location.pathname;
    let splitted = path.split("/");
    let search = splitted[splitted.length - 1];
    return search.replaceAll("%20", " ");
  };
  const [query, setQuery] = React.useState(getSearch());
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (searchParams.get("query")){
      setQuery(searchParams.get("query"));
    } else {
      setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

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
              <Typography variant="h4" align="center" paragraph>
                {"Viser treff for: " + query}
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    onClick={() => {
                      alert("klikk");
                    }}
                    style={{ cursor: "pointer"}}
                    // sx={{bgcolor: "#f7f7f7"}}
                    variant="outlined"
                  >
                    <CardMedia
                      component="img"
                      image={groupImage}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        <b>Heading</b>
                      </Typography>
                      <Typography variant="body1">
                        This is a media card. You can use this section to
                        describe the content.
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
