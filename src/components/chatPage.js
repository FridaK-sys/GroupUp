import * as React from "react";
import AppBar from "./AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuList from "./HomePageList";
import { useNavigate } from "react-router-dom";
import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="Homepage.js">
        GroupUp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function ChatPage() {
  let navigate = useNavigate();
  const [chatName, setChatName] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [myUserID, setMyUserID] = React.useState(7);
  React.useEffect(() => {
    let tokenSession = window.sessionStorage.getItem("token");
    let tokenLocal = window.localStorage.getItem("token");
    if (!tokenSession && !tokenLocal) {
      navigate("/");
    }
    setChatName("Fotball");
    let msgs = [];
    for (let i = 0; i < 1000; i++) {
      let msg = new Object();
      msg["userID"] = 7;
      msg["msg"] = "Hei hei! " + String(i);
      msgs.push(msg);
      msg = new Object();
      msg["userID"] = 1;
      msg["msg"] = "Hei hei på deg!";
      msgs.push(msg);
    }
    setMessages(msgs);
    console.log(msgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let msg = data.get("msg");
    alert(msg);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar />
      </Box>
      <main style={{ display: "flex" }}>
        {/* Hero unit */}
        <MenuList />
        <Box style={{ width: "65%" }}>
          <Box
            sx={{
              mt: 3,
              mb: 0,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="primary.dark"
                gutterBottom
              >
                {chatName}
              </Typography>
            </Container>
          </Box>
          <Container fixed maxWidth="md">
            <Box
              sx={{
                mb: 3,
                border: 1,
                borderColor: "grey.1000",
                borderRadius: "2%",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                sx={{
                  height: "50vh",
                  mt: 2,
                  mb: 2,
                  ml: 2,
                  mr: 2,
                  overflow: "hidden",
                  overflowY: "scroll",
                  borderRadius: "2%",
                }}
              >
                {messages.map((item, index) => {
                  let isMe = Boolean(item["userID"] === myUserID);
                  let side = "left";
                  if (isMe) {
                    side = "right";
                  }
                  console.log("item: ", item);
                  console.log("usr: ", item["username"]);
                  return (
                    <ChatMsg side={side} avatar={""} messages={[item["msg"]]} />
                  );
                })}
              </Box>
            </Box>
          </Container>
          <Box
            component="form"
            noValidate
            onSubmit={handleSend}
            sx={{ mt: 1, width: "80%" }}
          >
            <TextField
              style={{ textAlign: "left" }}
              name="msg"
              hintText="Message Field"
              floatingLabelText="MultiLine and FloatingLabel"
              multiline
              rows={2}
            />
            <IconButton type="submit" >
              <SendIcon style={{ justifyContent: "center" }} fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
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
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
