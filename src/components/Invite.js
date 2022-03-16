import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import * as React from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import Avatar from "@mui/material/Avatar";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';

export default function Invite() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState("");

  //Hente grupper fra databasen
  const invites = ["Fotball", "Bil", "Matematikk", "Ridning", "Fotball", "Bil", "Matematikk", "Ridning", "Fotball", "Bil", "Matematikk", "Ridning"];

  let navigate = useNavigate();

  const handleNameChange = e => {
      setName(e.target.value);
  }

  return (
    <div>
      <Button variant="contained" sx={{ mt: 0.5, mb: 0.5, ml: 2, width: '100%', right: '1vw'}} onClick={handleOpen}>
        Invitasjoner
      </Button>
      <Modal style = {{overflow: 'auto', maxHeight: '50%', maxWidth: '40%', left: '58%', top: '9.5%'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          item
          xs="auto"
          margin="auto"
          alignItems="center"
          justifyContent="center"
          sm="auto"
          md="auto"
          component={Paper}
          elevation={6}
          square
        >
          <Box 
            sx={{
            mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Mine Invitasjoner
            </Typography>
            <Box
              component="form"
              noValidate
              //onSubmit={handleRegister}
              sx={{ mt: 1 }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
             <Box>
              {invites.map((name, index) => {
                return (
                  <ListItem button key={index}>
                    <ListItemIcon><FiberManualRecordIcon /></ListItemIcon>
                    <ListItemText sx ={{ mr: 10, position: "relative", right: "1vw", mb: 0.75, mt: 0.75, pl: 4 }} primary={name} onClick={() => { navigate('/homepage/grouppage/' + index); handleClose() }}/>
                  </ListItem>)
              })} 
              </Box>
              <Box>
              {invites.map((name, index) => {
                return (
                  <ListItem button key={index} style={{ display: "flex", flexDirection: "row" }}>
                   <Button variant="contained" sx={{ ml: 2, width: '100%', right: '1vw' }} onClick={handleClose}>
                      Avslå
                    </Button>
                    <Button variant="contained" sx={{ ml: 2, width: '100%', right: '1vw' }} onClick={handleClose}>
                      Godta
                    </Button>
                  </ListItem>)
              })} 
              </Box>
              </div>
              <Grid container></Grid>
            </Box>
          </Box>
        </Grid>
      </Modal>
    </div>
    
  );
}
