import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function NestedList() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const groups = ["Fotball", "Bil", "Matematikk", "Ridning"];

  let navigate = useNavigate();

  return (
    <List
      sx={{ width: '20%', bgcolor: 'background.paper', height: '100%'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton> */}
      <ListItemButton>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Groups" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button key='createGroup'>
            <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
            <ListItemText primary='Opprett Gruppe' />
          </ListItem>
          {groups.map((name, index) => {
            return (
            <ListItem button key={index} onClick={() => navigate('/homepage/grouppage/' + index)} sx={{ pl: 4 }}>
              <ListItemIcon><FiberManualRecordIcon /></ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>)
          })}
        </List>
      </Collapse>
    </List>
  );
}