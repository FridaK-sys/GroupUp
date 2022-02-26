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
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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

const groups = ["Fotball", "Bil", "Matematikk", "Ridning"];
const membernums = ['23', '21', '3', '1044'];
const interests = ['spille fotball', 'skru bil', 'regne', 'Ri hest, ponny eller annet'];

 
export default function Grouppage(props) {
  let navigate = useNavigate();

  const [groupID, setGroupID] = useState(null);

  const getID = () => {
    let path = window.location.pathname;
    let id = path.split('/')[path.split('/').length - 1];
    return id;
  } 
  React.useEffect(() => {
    setGroupID(getID());
  }, [])

  React.useEffect(() => {
    setGroupID(getID());
  }, [navigate])

  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar></AppBar>
      </Box>
      <MenuList />
      <Box style={{ display: 'flex', position: 'relative', left: '25vw'}}>
        {/* Hero unit */}
        <div className="pic-container">
          <ReactRoundedImage image={GroupImage} id="profilepic" />
        </div>

        <Typography id="labels">
          @{groups[groupID]} {"\n"}{" "}
        </Typography>
        <Typography id="labels">
          Antall medlemmer: {membernums[groupID]} {"\n"}{" "}
        </Typography>
        <Typography id="labels">
          interesser: {interests[groupID]} {"\n"}{" "}
        </Typography>
        <Typography id="labels">
          Biografi: {'Vi liker balblabla'} {"\n"}
        </Typography>
        <div className="edit-btn">
          <EditGroupInfo />
        </div>

      </Box>
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
        {<Copyright />}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}