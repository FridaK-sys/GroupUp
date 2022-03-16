import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { addYears, isBefore } from "date-fns";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"

export default function SignUpForm(props) {
  const [passwordError, setPasswordError] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [ageError, setAgeError] = React.useState("");
  const [birthDate, setBirthDate] = React.useState(null);

  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get("brukernavn");
    let fullName = data.get("fulltNavn");
    let intrests = data.get("interesser");
    if(intrests === ""); // just to remove warning
    let password1 = data.get("passord");
    let password2 = data.get("gjentaPassord");
    if (!username) {
      setUsernameError("Dette feltet kan ikke være tomt.");
    }
    if (!fullName) {
      setNameError("Dette feltet kan ikke være tomt.");
    }
    if(!password1) {
      setPasswordError("Dette feltet kan ikke være tomt.");
    }
    if (!birthDate) {
      setAgeError("Dette feltet kan ikke være tomt.");
    } 
    if (password1 !== password2) {
      setPasswordError("Passordene må være like.");
    }
    if (isBefore(birthDate, addYears(new Date(), -18))) {
      console.log("old enough: " + birthDate);
    } else {
      console.log("not old enough");
      setAgeError("Brukere må være 18 år eller eldre.");
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
        <AccountCircleOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Registrer deg
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleRegister}
        sx={{ mt: 1, width: "80%" }}
      >
        <Collapse in={usernameError !== ""}>
          <Alert
            severity="error"
            onClose={() => {
              setUsernameError("");
            }}
            style={{marginTop: "8px"}}
          >
            {usernameError}
          </Alert>
        </Collapse>
        <TextField
          margin="normal"
          required
          fullWidth
          id="brukernavn"
          label="Brukernavn"
          name="brukernavn"
          error={usernameError !== ""}
          autoFocus
          onChange={() => {setUsernameError("")}}
        />
        <Collapse in={nameError !== ""}>
          <Alert
            severity="error"
            onClose={() => {
              setNameError("");
            }}
            style={{marginTop: "8px"}}
          >
            {nameError}
          </Alert>
        </Collapse>
        <TextField
          margin="normal"
          required
          fullWidth
          name="fulltNavn"
          label="Fullt navn"
          id="fulltNavn"
          error={nameError !== ""}
          onChange={() => {setNameError("")}}
        />
        <TextField
          margin="normal"
          fullWidth
          name="interesser"
          label="Interesser"
          id="interesser"
        />
        <Collapse in={ageError !== ""}>
          <Alert
            severity="error"
            onClose={() => {
              setAgeError("");
            }}
            style={{marginTop: "8px"}}
          >
            {ageError}
          </Alert>
        </Collapse>
        <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fødselsdato"
            value={birthDate}
            onChange={(newValue) => {
              setBirthDate(newValue);
              setAgeError("");
            }}
            renderInput={(params) => (
              <TextField {...params} margin="normal" required fullWidth error={ageError !== ""} onChange={() => {setAgeError("");}}/>
            )}
          />
        </LocalizationProvider>
        <Collapse in={passwordError !== ""}>
          <Alert
            severity="error"
            onClose={() => {
              setPasswordError("");
            }}
            style={{marginTop: "8px"}}
          >
            {passwordError}
          </Alert>
        </Collapse>
        <TextField
          margin="normal"
          required
          fullWidth
          error={passwordError !== ""}
          name="passord"
          label="Passord"
          type="password"
          id="passord"
          autoComplete="current-password"
          onChange={() => {
            setPasswordError("");
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          error={passwordError !== ""}
          name="gjentaPassord"
          label="Gjenta passord"
          type="password"
          id="gjentaPassord"
          autoComplete="current-password"
          onChange={() => {
            setPasswordError("");
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
        <Grid item>
          <Link
            style={{cursor: "pointer"}}
            variant="body2"
            onClick={() => {  
              props.handleAbort();
            }}
          >
            {"Har du bruker? Klikk her for å logge inn."}
          </Link>
        </Grid>
      </Box>
    </Box>
  );
}
