import * as React from 'react';
import AppBar from './AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuList from './HomePageList'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="Homepage.js">
//         GroupUp
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


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
				<form className="userInfoLabels">
					<h1> Fotball </h1>
					<Link to="/homepage" >
            <img alt="gruppebilde" src= {'./../images/logo.png'} />
          </Link>

					<Typography id="labels">
						Gruppenavn : @{'Fotball'} {"\n"}{" "}
					</Typography>
					<Typography id="labels">
						interesser : {"fotball"} {"\n"}{" "}
					</Typography>
					<Typography id="labels">
						Bio : {"Vi liker fotball"} {"\n"}
					</Typography>
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