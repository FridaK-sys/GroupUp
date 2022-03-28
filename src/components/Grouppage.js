import * as React from "react";
import AppBar from "./AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuList from "./HomePageList";
import ReactRoundedImage from "react-rounded-image";
import EditGroupInfo from "./EditGroupInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Bilimage from "./../images/Bil.png";
import Ridningimage from "./../images/Ridning.png";
import Fotballimage from "./../images/Fotball.png";
import Matematikkimage from "./../images/Matematikk.png";
import AddMember from "./AddMember";
import Likes from "./MatchFunction";
import Matchlist from "./MatchList";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

const theme = createTheme();

initializeApp({
  apiKey: "AIzaSyCW9axUW2035fjrqjts23aw32k09gtLUdY",
  authDomain: "groupup-5ffe8.firebaseapp.com",
  databaseURL:
    "https://groupup-5ffe8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "groupup-5ffe8",
  storageBucket: "groupup-5ffe8.appspot.com",
  messagingSenderId: "263112867766",
  appId: "1:263112867766:web:9e823c8699eace63d44b17",
});

const auth = getAuth();
const firestore = getFirestore();


const images = [Fotballimage, Bilimage, Matematikkimage, Ridningimage];

export default function Grouppage(props) {
  let navigate = useNavigate();
  const [user] = useAuthState(auth);

  //Popover
  const [anchor, setAnchor] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };
  //Popover

  const [members, setMembers] = useState([]);
  const [bio, setBio] = useState("");
  const [groupName, setGroupName] = useState("");

  const numMembers = members.length;

  // const getUsername = (userID) => {
  //   return new Promise(function (resolve, reject) {
  //     const usersRef = collection(firestore, "userInfo");
  //     const uq = query(usersRef, where("userID", "==", userID));
  //     getDocs(uq)
  //       .then(function (users) {
  //         // let username = "";
  //         // users.forEach(function (user) {
  //         let username = users[0].data().username;
  //         // });
  //         console.log("resolving name: ", username);
  //         resolve(username);
  //       })
  //       .catch(function () {
  //         reject("error");
  //       });
  //   });
  //   // .then(
  //   //   function (result) {
  //   //     console.log("got result: ", result);
  //   //     return result;
  //   //   },
  //   //   function (error) {
  //   //     return "Error";
  //   //   }
  //   // );
  // };

  // const setUsernames = (userIDs) => {
  //   let userNames = userIDs;
  //   // userIDs.forEach(async function (userID) {
  //   //   let username = await getUsername(userID);
  //   //   console.log("getting name for: ", userID);
  //   //   userNames.push(username);
  //   // });
  //   console.log("usernames: ", userNames);
  //   console.log("userIDs: ", userIDs);
  //   setMembers(userNames);
  // };

  const reloadGroupInfo = async () => {
    let name = getName();
    console.log("name: " + name);
    // name = "PU gruppen";
    setGroupName(name);
    const chatsRef = collection(firestore, "groups");
    const gq = query(chatsRef, where("name", "==", name));
    let userIDs;
    getDocs(gq)
      .then(function (docs) {
        docs.forEach(function (doc) {
          setGroupName(doc.data().name);
          setBio(doc.data().bio);
          userIDs = doc.data().users;
        });
        setMembers(userIDs);
        if (userIDs.includes(user.uid)) {
          setDisableBtn(true);
        } else {
          setDisableBtn(false);
        }
      })
  };

  const getName = () => {
    let path = window.location.pathname;
    let name = path.split("/")[path.split("/").length - 1];
    name = name.replaceAll("%20", " ");
    setGroupName(name);
    return name;
  };

  const handleJoin = () => {
    const userid = user.uid;
    const gn = getName();
    const groupRef = collection(firestore, "groups");
    const gq = query(groupRef, where("name", "==", gn));
    getDocs(gq).then(function(docs) {
      docs.forEach(function(doc) {
        console.log(doc);
        console.log(gn);
        console.log(userid);
        let users = doc.data().users;
        users.push(userid);
        updateDoc(doc.ref, {users: users});
      })
    });

    const userRef = collection(firestore, "userInfo");
    const uq = query(userRef, where("userId", "==", userid));
    getDocs(uq).then(function(docs) {
      docs.forEach(function(doc) {
        console.log(doc);
        let groups = doc.data().groups;
        groups.push(gn);
        updateDoc(doc.ref, {groups: groups});
      })
    });

    reloadGroupInfo();
    setDisableBtn(true);
    console.log("handleJoin");
    
  }

  React.useEffect(() => {
    reloadGroupInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // let [bio, setBio] = React.useState("Fortell om gruppen!");
  // const handleBioChange = e => {
  //   setBio(e.target.value);
  // }

  // let [interest, setInterest] = React.useState("Hva er gruppens interesser?");
  // const handleInterestChange = e => {
  //   setInterest(e.target.value);
  // }

  // const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar></AppBar>
      </Box>
      <main style={{ display: "flex" }}>
        <MenuList />
        <Box style={{ width: "65%" }}>
          {/* Hero unit */}
          <Box style={{ width: "65%" }}>
            {/* <div className='group' style={{ display: 'flex', width: '70vw', height: '70vh'}}> */}
            <div
              className="pic-container"
              style={{ position: "relative", top: "90px", left: "-10vw" }}
            >
              <ReactRoundedImage image={images[1]} id="profilepic" />
              <Typography
                id="labels"
                style={{
                  position: "relative",
                  left: "200px",
                  bottom: "200px",
                  fontSize: "40px",
                }}
              >
                @{groupName} {"\n"}{" "}
              </Typography>
            </div>
            <div
              className="groupinfo"
              style={{ position: "absolute", left: "20vw", top: "450px" }}
            >
              <Button
                id="memberBox"
                onClick={openPopover}
                style={{ fontSize: "22px" }}
              >
                Antall medlemmer: {numMembers} {"\n"}{" "}
              </Button>
              <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                style={{
                  top: "20vh",
                  left: "12vw",
                }}
                onClose={() => setAnchor(null)}
              >
                <List
                  component="div"
                  style={{
                    maxHeight: "50vh",
                    minWidth: "20vw",
                    alignContent: "center",
                  }}
                  disablePadding
                >
                  {members.map((name, index) => {
                    return (
                      <ListItem
                        button
                        key={index}
                        onClick={() => navigate("/homepage")}
                      >
                        <ListItemIcon>
                          <img
                            alt="of stuff"
                            src={images[1]}
                            style={{ height: "60px" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ fontSize: "22px" }}
                          primary={name}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Popover>
              <Button onClick={handleJoin} variant="contained" disabled={disableBtn} sx={{ mt: 0.5, mb: 0.5 }}>
                + Bli medlem
              </Button>
              <AddMember />
              <div className="edit-btn" style={{ top: "50px", left: "2vW" }}>
                <EditGroupInfo />
              </div>
            </div>
            <div
              className="bio"
              style={{
                maxWidth: "40vw",
                maxHeight: "30vh",
                fontSize: "22px",
                position: "absolute",
                left: "45vw",
                top: "100px",
              }}
            >
              <h2>Bio:</h2>
              <h4>{bio}</h4>
            </div>
            {/* </div> */}
          </Box>
        </Box>
        {/* <Footer /> */}
      </main>
      <div className="match-icon-placement">
        <Likes />
      </div>
      <div className="match-list-placement">
        <Matchlist />
      </div>
    </ThemeProvider>
  );
}
