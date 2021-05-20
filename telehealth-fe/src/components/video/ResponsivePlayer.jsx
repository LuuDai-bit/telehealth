import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./responsive-player.scss"

class ResponsivePlayer extends React.Component {
  componentDidMount() {
    Axios.post(`http://27.72.147.196:36705/secured/ws/rest/v1/async/me/login`, { "username": "demo1234", "password": "iTech1234" })
    .then(res => {
      if(res.data) {
        // cookies.set('Authorization', 'Bearer ZGVtbzEyMzQ6aVRlY2gxMjM0')
      }
    })
    .catch(error => {
      toast.error(error.message);
    })
  }

  render () {
    console.log(this.props);
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          playing
          url={[
            {src: `http://27.72.147.196:36705/secured/ws/v1/async/media/${this.props.code}/stream`, type: "video/mp4"},
          ]}
          ref={player => this.player = player}
          light={true}
          width="100%"
          height="100%"
          controls={true}
          onStart={() => {this.player.seekTo(this.props.seek || 0)}}
          config= {{
            file: {
              attributes: {
                crossOrigin: "true",
                controlsList: "nodownload"
              },
              tracks: [
                {kind: "subtitles", src: "subs/test_vtt.en.vtt", srcLang: "en", default: true}
              ]
            }
          }}
        />
      </div>
    )
  }
  
}

export default ResponsivePlayer;
