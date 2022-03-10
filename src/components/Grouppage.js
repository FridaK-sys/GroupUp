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

  let [bio, setBio] = React.useState("");
  bio = 'Lorem ipsum dolor sit amet. Qui quia quos ab enim nulla 33 consectetur delectus vel dolores cumque 33 dolorem iusto. Est velit explicabo ex ipsum nostrum quo animi exercitationem eos velit fugiat.';
  const handleBioChange = e => {
    setBio(e.target.value);
  }

  let [interest, setInterest] = React.useState("");
  interest = 'Fotball og sånt';
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
      <Box style={{ width: "65%" }}>
        {/* Hero unit */}
        <Box style={{ width: "65%" }}>
        {/* <div className='group' style={{ display: 'flex', width: '70vw', height: '70vh'}}> */}
          <div className="pic-container" style={{position: 'relative', top:'90px', left: '-10vw'}}>
            <ReactRoundedImage image={images[groupID]} id="profilepic" />
            <Typography id="labels" 
            style={{position: 'relative', left: '200px', bottom: '200px', fontSize:'40px', color: 'white'}}
            >
              @{groups[groupID]} {"\n"}{" "}
            </Typography>
          </div>
          <div className='groupinfo' style={{position: 'absolute', left: '20vw', top: '450px'}}>
            <Button id='memberBox' onClick={openPopover} style={{fontSize:'22px'}}>
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
              <List component="div" style={{maxHeight: '50vh', minWidth: '20vw', alignContent: 'center'}} disablePadding>
                {members.map((name, index) => {
                  return (
                    <ListItem button key={index} onClick={() => navigate('/homepage')}>
                      <ListItemIcon><img alt="of stuff" src={images[groupID]} style={{height: '60px'}}/></ListItemIcon>
                      <ListItemText primaryTypographyProps={{fontSize: '22px'}} primary={name}/>
                    </ListItem>)
                })}
              </List>
            </Popover>
            <div className="edit-btn" style={{top: "50px", left: "2vW"}}>
              <EditGroupInfo 
              bio={bio} 
              interest={interest} 
              handleInterestChange={handleInterestChange}
              handleBioChange={handleBioChange}
              />
            </div>
          </div>
          <div className='bio' style={{maxWidth: '40vw', maxHeight: '30vh',fontSize: '22px', position: 'absolute', left: '45vw', top: '100px'}}>
            <h2>Bio:</h2>
            <h4>{bio}</h4>
          </div>
        {/* </div> */}
        </Box>
      </Box>
      {/* <Footer /> */}
      </main>
    </ThemeProvider>
  );
}