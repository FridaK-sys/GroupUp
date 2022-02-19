import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import GroupIcon from '@mui/icons-material/Group';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const groups = ["Fotball", "Bil", "Matematikk", "Bading"];

  return (
    <List
      sx={{ width: '20%', maxWidth: 360, bgcolor: 'background.paper' }}
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
          {groups.map(group => {
            return (
            <ListItem button href={group.route} sx={{ pl: 4 }}>
              <ListItemIcon><ArrowRightIcon /></ListItemIcon>
              <ListItemText primary={group} />
            </ListItem>)
          })}
        </List>
      </Collapse>
    </List>
  );
}