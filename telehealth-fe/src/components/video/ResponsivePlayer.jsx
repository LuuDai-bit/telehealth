import React, { useRef, useState } from "react"
import ReactPlayer from "react-player"

import "./responsive-player.scss"

class ResponsivePlayer extends React.Component {
  render () {
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          playing
          url={[
            {src: "data/videos/test_video.mp4", type: "video/mp4"},
          ]}
          ref={player => this.player = player}
          light={true}
          width="100%"
          height="100%"
          controls={true}
          onStart={() => {this.player.seekTo(10)}}
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
