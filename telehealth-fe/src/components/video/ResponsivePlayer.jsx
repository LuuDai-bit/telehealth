import React, { useRef, useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./responsive-player.scss";

class ResponsivePlayer extends React.Component {
  componentDidMount() {
    if (this.props.time) {
      const player = document.querySelector('#video-player');
      player.currentTime = this.props.time;
    }
  }

  render () {
    return (
      <div className="player-wrapper">
        <video className="react-player" id="video-player" controls>
          <source src={`http://27.72.147.196:36705/secured/ws/rest/v1/async/media/${this.props.code}/stream`}></source>
          <track label="English" kind="subtitles" srclang="en" src="subs/test_vtt.en.vtt" default></track>
        </video>
      </div>
    )
  }
  
}

export default ResponsivePlayer;
