import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { addYears, isBefore } from "date-fns";

export default function SignUpForm() {
  const [passwordError, setPasswordError] = React.useState(false);
  const [ageError, setAgeError] = React.useState(false);
  const [birthDate, setBirthDate] = React.useState(null);

  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get("brukernavn");
    let fullName = data.get("fulltNavn");
    let intrests = data.get("interesser");
    let password1 = data.get("passord");
    let password2 = data.get("gjentaPassord");
    if (password1 !== password2) {
      setPasswordError(true);
    }
    if (isBefore(birthDate, addYears(new Date(), -18))) {
      console.log("old enough: " + birthDate);
    } else {
      console.log("not old enough");
      setAgeError(true);
    }
    // alert(
    //   "brukernavn: " +
    //     username +
    //     ", fullt navn: " +
    //     fullName +
    //     ", interesser: " +
    //     intrests +
    //     ", passord: " +
    //     password1 +
    //     ", gjenta passord: " +
    //     password2
    // );
  };
  return (
    <Grid
      item
      xs={12}
      margin="auto"
      alignItems="center"
      justifyContent="center"
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      square
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrer deg
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleRegister}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="brukernavn"
            label="brukernavn"
            name="brukernavn"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="fulltNavn"
            label="fullt navn"
            id="fulltNavn"
          />
          <TextField
            margin="normal"
            fullWidth
            name="interesser"
            label="interesser"
            id="interesser"
          />
          <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
            <DatePicker
              label="fødselsdato"
              value={birthDate}
              onChange={(newValue) => {
                setBirthDate(newValue);
                setAgeError(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  error={ageError}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            margin="normal"
            required
            fullWidth
            error={passwordError}
            name="passord"
            label="passord"
            type="password"
            id="passord"
            autoComplete="current-password"
            onChange={() => {
              setPasswordError(false);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            error={passwordError}
            name="gjentaPassord"
            label="gjenta passord"
            type="password"
            id="gjentaPassord"
            autoComplete="current-password"
            onChange={() => {
              setPasswordError(false);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register deg
          </Button>
          <Grid container></Grid>
        </Box>
      </Box>
    </Grid>
  );
}
