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
  React.useEffect(() => {
    let tokenSession = window.sessionStorage.getItem("token");
    let tokenLocal = window.localStorage.getItem("token");
    if (!tokenSession && !tokenLocal) {
      navigate("/");
    }
    setChatName("Fotball");
    let msgs = [];
    let msg = new Object();
    msg["username"] = "Tor";
    msg["msg"] = "Hei hei!";
    msgs.push(msg);
    msgs["username"] = "Frida";
    msgs["msg"] = "Hei hei på deg!";
    msgs.push(msg);
    setMessages(msgs);
    console.log(msgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              pt: 8,
              pb: 6,
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
          <Container sx={{ py: 0 }} maxWidth="md">
            {messages.map((item, index) => {
              // let isMe = item
              console.log("item: ", item);
              console.log("usr: ", item["username"]);
              let name = item["username"];
              return (
                <ChatMsg
                  avatar={""}
                  messages={[item["msg"],]}
                />
              );
            })}
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
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
