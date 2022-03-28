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
import CreateNewGroup from './CreateNewGroup'

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';

const auth = getAuth();
const firestore = getFirestore();


export default function NestedList() {

  const [groups, setGroups] = React.useState([]);

  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);


  const handleClick = () => {
    setOpen(!open);
  };


  let navigate = useNavigate();

  React.useEffect(() => {
    let isMounted = true;

    const groupsRef = collection(firestore, "groups");
    const gq = query(
      groupsRef,
      where("users", "array-contains-any", [user.uid])
    );
    console.log("Querying: HomePgaeList");
    getDocs(gq).then((docs) => {
      let allGroups = []
      docs.forEach((doc) => {
        allGroups.push(doc.data().name); 
        //setGroups(groupsSum);

      });
      if (isMounted) setGroups(allGroups);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    return () => { isMounted = false };
  }, [user]);

  return (
    <List
      sx={{ width: '20%', height: '100%'}}
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
          <ListItem button key='createGroup' sx={{ml: 2}}>
            <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
            <div id='creategroup'><CreateNewGroup /></div>
          </ListItem>
          {Array.from(groups).map((name, index) => {
            return (
            <ListItem button key={index} onClick={() => navigate('/homepage/grouppage/' + name)} sx={{ pl: 4 }}>
              <ListItemIcon><FiberManualRecordIcon /></ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>)
          })}
         
        </List>
      </Collapse>
    </List>
  );
}