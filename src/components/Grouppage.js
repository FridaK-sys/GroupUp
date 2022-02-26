import * as React from 'react';
import AppBar from './AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuList from './HomePageList'
import ReactRoundedImage from "react-rounded-image";
import EditGroupInfo from "./EditGroupInfo";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const theme = createTheme();

const groups = ["Fotball", "Bil", "Matematikk", "Ridning"];
const membernums = ['23', '21', '3', '1044'];
const interests = ['spille fotball', 'skru bil', 'regne', 'Ri hest, ponny eller annet'];
const members = ['Ruben', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe', 'Johannes', 'Frida', 'Hallvard', 'Stefan', 'Vilde', 'Tor', 'Leif Einar Lothe'];
 

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

  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar></AppBar>
      </Box>
      <Box style={{ display: 'flex'}}>
        {/* Hero unit */}
        <MenuList />

        <div className='group' style={{ display: 'flex', width: '70vw', height: '70vh', padding: '5vw', margin: '10vw' }}>
          <div className="pic-container" style={{position: 'absolute', top:'10vh', left: '20vw'}}>
            <ReactRoundedImage image={require('./../images/' + groups[groupID] + '.png')} id="profilepic" />
            <Typography id="labels" style={{position: 'relative', left: '200px', bottom: '200px', fontSize:'40px'}}>
              @{groups[groupID]} {"\n"}{" "}
            </Typography>
          </div>
          <div className='groupinfo' style={{position: 'absolute', left: '20vw'}}>
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
                      <ListItemIcon><img src={require('./../images/' + groups[groupID] + '.png')} style={{height: '60px'}}/></ListItemIcon>
                      <ListItemText primaryTypographyProps={{fontSize: '22px'}} primary={name}/>
                    </ListItem>)
                })}
              </List>
            </Popover>
            <div className="edit-btn">
              <EditGroupInfo />
            </div>
          </div>
          <div className='bio' style={{minWidth: '50vw', maxHeight: '30vh',fontSize: '22px', position: 'relative', left: '5vw', bottom: '20vh', border: 'solid', borderWidth: '2px'}}>
            <h1>Om gruppen</h1>
            <h3>{interests[groupID]}</h3>
          </div>
        </div>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}