import React, { useRef, useState } from "react"

import VideoCard from './video-card/VideoCard';
import "./video-list.scss";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SearchInput from '../search-input/SearchInput';

class VideoList extends React.Component {
  state = {
    videos: [],
  };

  getVideos = () => {
    Axios.get('api/v1/videos/1/10')
      .then((response) => {
        this.setState({
          videos: response.data
        })
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  };

  componentDidMount() {
    this.getVideos();
  }

  render () {
    const ListVideos = this.state.videos
    return (
      <div className="container">
        <SearchInput />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <ul>
              {
                ListVideos.map((video) => {
                  return (<VideoCard key={video.id} video={video}/>)
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
}

export default VideoList;
