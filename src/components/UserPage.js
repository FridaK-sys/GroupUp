import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import EditUserInfo from "./EditUserPage";
import Input from "@mui/material/Input";

// dynamic states for Userprofile
export class UserProfile extends Component {
  constructor(props) {
    super(props);
    // TODO get this from database, dummy data only
    this.state = {
      username: "nordmann99",
      fullName: "Ole Hansen",
      password: "bruh",
      interests: "fotball, anime",
      bio: "jeg liker filmer",
      image: null,
      age: 18
    };
    this.onImageChange = this.onImageChange.bind(this);
  }
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };
  render() {
    return (
      <form className="userInfoLabels">
        <h1> Your user page </h1>
        <div className="pic-container">
          <img src={this.state.image} id="profilepic" alt="" />
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
          <EditUserInfo
            interests={this.state.interests}
            bio={this.state.bio}
          ></EditUserInfo>
        </div>
        <label className="file-input">
          <Input
            type="file"
            variant = "contained"
            onChange={this.onImageChange}
            
          />
          Velg profilbilde
        </label>
      </form>
    );
  }
}

export default UserProfile;
