import React from 'react';
import { Component } from "react";
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';

export default class Likes extends Component{
  constructor(props) {
    super(props)
    this.onButtonClicked = this.onButtonClicked.bind(this)
    this.state = { currentButton: null }
  }

  onButtonClicked (id) {
    this.setState({ currentButton: this.state.currentButton === id ? null : id })

  }

  render(){
    return (
      <div className="Place-fav-icon">
        <IconButton 
          color={this.state.currentButton === 0 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(0)}>
          <FavoriteIcon className="favouriteIcon"/>
        </IconButton>
        <IconButton
          color={this.state.currentButton === 1 ? "primary" : "default" }
          onClick={() => this.onButtonClicked(1)}>
          <StarIcon className = "superliked-icon"/>
        </IconButton>
      </div>
    );
  }
}