import React from 'react'
import ReactPlayer from 'react-player'
import './responsive-player.css'

const ResponsivePlayer = () => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        playing
        url={[
          {src: 'data/videos/test_video.mp4', type: 'video/mp4'},
        ]}
        width='100%'
        height='100%'
        config= {{
          file: {
            attributes: {
              crossOrigin: 'true'
            },
            tracks: [
              {kind: 'subtitles', src: 'subs/test_vtt.en.vtt', srcLang: 'en', default: true}
            ]
          }
        }}
      />
    </div>
  )
}

export default ResponsivePlayer;