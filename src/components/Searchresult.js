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
import { useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';

const firestore = getFirestore();

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


const theme = createTheme();

const groupImage = require("./../images/hest.png");

export default function Grouppage() {
  const location = useLocation();
  const getSearch = () => {
    let path = window.location.pathname;
    let splitted = path.split("/");
    let search = splitted[splitted.length - 1];
    return search.replaceAll("%20", " ");
  };
  const [query_param, setQuery] = React.useState(getSearch());
  const [searchParams, setSearchParams] = useSearchParams();
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    if (searchParams.get("query")){
      setQuery(searchParams.get("query"));
    } else {
      setQuery("");
    }
    if (false) {
      setSearchParams("testing");
    }
    const groupsRef = collection(firestore, "groups");
    let name;
    if (searchParams.get("query") !== "null") {
      console.log("name", searchParams.get(query));
      name = where("name", "==", searchParams.get("query"));
    } else {
      name = null;
    }
    let ints;
    if (searchParams.get("interests") !== "") {
      console.log("Adding interests", searchParams.get("interests"));
      ints = where("labels", "array-contains-any", [searchParams.get("interests")]);
    } else {
      ints = null;
    }
    let locs;
    if (searchParams.get("location") !== "") {
      console.log("Adding location", searchParams.get("location"));
      locs = where("lokasjon", "==", searchParams.get("location"));
    } else {
      locs = null;
    }
    let max;
    if (searchParams.get("max") !== "") {
      console.log("Adding max", parseInt(searchParams.get("maxSize")));
      max = where("count", "<=", parseInt(searchParams.get("maxSize")));
    } else {
      max = null;
    }
    let min;
    if (searchParams.get("min") !== "") {
      console.log("Adding min", parseInt(searchParams.get("minSize")));
      min = where("count", ">=", parseInt(searchParams.get("minSize")));
    } else {
      min = null;
    }


    // let gq = query(groupsRef, [locs]);
    let gq = query.apply(null, [groupsRef, name, ints, locs, max, min].filter((x) => x !== null));
    // if (name !== null && ints !== null && locs !== null) {
    //    gq = query(
    //     groupsRef,
    //     name,
    //     ints
    //   );
    //   } else if (name !== null) {
    //   gq = query(
    //     groupsRef,
    //     name
    //   );
    // } else if (ints !== null) {
    //   gq = query(
    //     groupsRef,
    //     ints
    //   );
    // } else {
    //   gq = query(
    //     groupsRef
    //   );
    // }

    getDocs(gq).then(docs => {
      setGroups([]);
      if (isMounted) {
        docs.forEach(doc => {
          console.log("Setting", doc.data().name);
          setGroups(groups => [...groups, doc.data().name]);
        })
      }
    });
    return () => { isMounted = false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="h4" align="center" paragraph>
                {"Viser treff for: " + query_param}
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {Array.from(groups).map((groupName) => (
                <Grid item key={groupName} xs={12} sm={6} md={4}>
                  <Card
                    onClick={() => {
                      alert("klikk");
                    }}
                    style={{ cursor: "pointer", border: '2px solid' }}
                    variant="outlined"
                    sx={{bgcolor: "text.main", p: 1}}
                  >
                    <CardMedia
                      component="img"
                      image={groupImage}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        <b>{groupName}</b>
                      </Typography>
                      <Typography variant="body1">
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
