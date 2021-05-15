import React, { useRef, useState } from "react"

import "./video-list.scss"
import Axios from "axios";
import axios from "axios";

class VideoList extends React.Component {
  state = {
    vides: 'not yet',
  };
  getVideos = () => {
    Axios.get('api/v1/videos/1/25')
      .then((response) => {
        const videos = response.data;
        const listLiVideos = [];
        // this.setState({
        //   videos: response.data
        // })
        videos.forEach(video => listLiVideos.push(<li>{video.title}</li>));
        this.setState({
          videos: listLiVideos
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getVideos();
  }

  render () {
    const listLiVideos = this.state.videos
    return (
      <div>
        <ul>
          {listLiVideos}
        </ul>
      </div>
    )
  }
  
}

export default VideoList;
