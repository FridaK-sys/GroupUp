import React, { Component } from "react";
import { render } from "react-dom";
import ReactDOM from "react-dom";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import EditUserInfo from "./EditUserPage";
import Input from "@mui/material/Input";
import AppBar from './AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuList from './HomePageList'
import { useNavigate } from 'react-router-dom';

// dynamic states for Userprofile
export class UserProfile extends Component {
  constructor(props) {
    super(props);
    // TODO get this from database, dummy data only
    this.state = {
      username: "nordmann123",
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
      <container> 
         <Box sx={{ flexGrow: 1 }}>
            <AppBar></AppBar>
          </Box>
          <main style={{ display: 'flex' }}>
          {/* Hero unit */}
          <MenuList/>
          
          <form className="userInfoLabels">
          
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
                >
                  {this.state.username}s profilside
            </Typography> 
            <div className="pic-container">
              <img src={this.state.image} id="profilepic" alt="" />
            </div>

            <Typography id="labels">
              Brukernavn : @{this.state.username} {"\n"}{" "}
            </Typography>
            <Typography id="labels">
              Interesser : {this.state.interests} {"\n"}{" "}
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
        </main>
      </container>
      
    );
  }
}

export default UserProfile;
