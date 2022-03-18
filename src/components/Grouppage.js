import * as React from 'react';
import AppBar from './AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuList from './HomePageList'
import ReactRoundedImage from "react-rounded-image";
import EditGroupInfo from "./EditGroupInfo";
// import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Footer from './Footer'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Bilimage from './../images/Bil.png';
import Ridningimage from './../images/Ridning.png';
import Fotballimage from './../images/Fotball.png';
import Matematikkimage from './../images/Matematikk.png';
import AddMember from './AddMember'
import Likes from './MatchFunction';
import Matchlist from "./MatchList"

const theme = createTheme();

const groups = ["Fotball", "Bil", "Matematikk", "Ridning"];
const membernums = ['23', '21', '3', '1044'];
const members = ['Ruben', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes'];
const images = [Fotballimage, Bilimage, Matematikkimage, Ridningimage];

export default function Grouppage(props) {
  let navigate = useNavigate();

  //Popover
  const [anchor, setAnchor] = useState(null);
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  }
  //Popover

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

  let [bio, setBio] = React.useState("Fortell om gruppen!");
  const handleBioChange = e => {
    setBio(e.target.value);
  }

  let [interest, setInterest] = React.useState("Hva er gruppens interesser?");
  const handleInterestChange = e => {
    setInterest(e.target.value);
  }

  // const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar></AppBar>
      </Box>
      <main style={{ display: "flex" }}>
        <MenuList />
        <Typography id="labels"
          style={{
            position: 'relative',
            left: '28vw',
            top: '-6vh',
            fontSize: '40px',
            color: 'white'
          }}
        >
          @{groups[groupID]} {"\n"}{" "}
        </Typography>
        {/* Hero unit */}
        <Box style={{ width: "65%" }}>
          {/* <div className='group' style={{ display: 'flex', width: '70vw', height: '70vh'}}> */}

          <div className='groupinfo'
            style={{
              position: 'absolute',
              left: '21vw',
              top: '10vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
            <ReactRoundedImage image={images[groupID]} id="profilepic"/>
            <Button id='memberBox' onClick={openPopover} style={{ fontSize: '22px' }}>
              Antall medlemmer: {membernums[groupID]} {"\n"}{" "}
            </Button>
            <Popover
              open={Boolean(anchor)}
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              style={{
                top: '20vh',
                left: '12vw',
              }}
              onClose={() => setAnchor(null)}
            >
              <List component="div" style={{ maxHeight: '50vh', minWidth: '20vw', alignContent: 'center' }} disablePadding>
                {members.map((name, index) => {
                  return (
                    <ListItem button key={index} onClick={() => navigate('/homepage')}>
                      <ListItemIcon><img alt="of stuff" src={images[groupID]} style={{ height: '60px' }} /></ListItemIcon>
                      <ListItemText primaryTypographyProps={{ fontSize: '22px' }} primary={name} />
                    </ListItem>)
                })}
              </List>
            </Popover>

            <Button variant="contained" sx={{ mt: 0.5, mb: 0.5 }}>
              + Bli medlem
            </Button>
            <AddMember />
            <EditGroupInfo
              bio={bio}
              interest={interest}
              handleInterestChange={handleInterestChange}
              handleBioChange={handleBioChange}
            />
            <Typography>{interest}</Typography>
          </div>
          <div className='bio' style={{ maxWidth: '40vw', maxHeight: '30vh', fontSize: '22px', position: 'absolute', left: '45vw', top: '100px' }}>
            <h2>Bio:</h2>
            <h4>{bio}</h4>
          </div>
          {/* </div> */}
        </Box>
        {/* <Footer /> */}
      </main>
      <div className="match-icon-placement">
        <Likes/>
      </div>
      <div className='match-list-placement'>
        <Matchlist/>
      </div>
      
    </ThemeProvider>
  );
}