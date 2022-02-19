import React, { Component } from "react";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import profilepic from "../images/profilepic.jpg";
import ReactRoundedImage from "react-rounded-image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Edit from "./EditUserPage";
import EditUserInfo from "./EditUserPage";

// dynamic states for Userprofile
export class Userprofile extends Component {
  constructor(props) {
    super(props);
    // TODO get this from database, dummy data only
    this.state = {
      username: "nordmann99",
      fullName: "Ole Hansen",
      password: "bruh",
      interests: "øl",
      bio: "jeg liker filmer",
      picture: "",
      age: 18
    };
  }

  render() {
    return (
      <form className="userInfoLabels">
        <h1> Your user page </h1>
        <div className="pic-container">
          <ReactRoundedImage image={profilepic} id="profilepic" />
        </div>

        <Typography id="labels">
          User name : @{this.state.username} {"\n"}{" "}
        </Typography>
        <Typography id="labels">
          interests : {this.state.interests} {"\n"}{" "}
        </Typography>
        <Typography id="labels">
          Bio : {this.state.bio} {"\n"}
        </Typography>
        <div className="edit-btn">
          <EditUserInfo></EditUserInfo>
        </div>
      </form>
    );
  }
}

export default Userprofile;