
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import GroupsIcon from '@mui/icons-material/Groups';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Matchlist() {
  const allMatches = ['strikking', 'tennis', 'fotball',"matlaging"];
  return (
    <ThemeProvider theme={theme}>
        <div>
          <Typography style={{fontsize:'22px'}}>
              Matcher 
          </Typography>
      </div><List className="match-list-style" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {allMatches.map((value) => (
                  <ListItem
                      key={value}
                      disableGutters
                      secondaryAction={<IconButton>
                          <GroupsIcon />
                      </IconButton>}
                  >
                      <ListItemText primary={value} />
                  </ListItem>
              ))}
          </List>
    </ThemeProvider>
  );
}
