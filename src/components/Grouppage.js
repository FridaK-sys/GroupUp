import * as React from 'react';
import AppBar from './AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuList from './HomePageList'
import GroupImage from "../images/hest.png";
import ReactRoundedImage from "react-rounded-image";
import EditGroupInfo from "./EditGroupInfo";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="Homepage.js">
        GroupUp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Grouppage() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar></AppBar>
      </Box>
      <main style={{ display: 'flex' }}>
        {/* Hero unit */}
        <MenuList />
				<form className="userInfoLabels" style={{position: 'relative', left: '20vw'}}>
        <h1> Ridning </h1>
        <div className="pic-container">
          <ReactRoundedImage image={GroupImage} id="profilepic" />
        </div>

        <Typography id="labels">
          User name : @{'Ridegruppa'} {"\n"}{" "}
        </Typography>
        <Typography id="labels">
          interests : {'Ri hest, ponny, det meste.'} {"\n"}{" "}
        </Typography>
        <Typography id="labels">
          Bio : {'Vi liker ridning'} {"\n"}
        </Typography>
        <div className="edit-btn">
          <EditGroupInfo />
        </div>
      </form>

      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
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
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}