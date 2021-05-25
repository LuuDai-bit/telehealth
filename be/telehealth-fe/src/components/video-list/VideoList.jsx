import React, { useRef, useState } from "react"

import VideoCard from './video-card/VideoCard';
import "./video-list.scss";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SearchInput from '../search-input/SearchInput';
import Pagination from '../pagination/Pagination';

class VideoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      page: 1,
    };
  }
  
  getVideos = (page=1) => {
    Axios.get(`api/v1/videos/${page}/5`)
      .then((response) => {
        this.setState({
          videos: response.data,
          page: page
        });
        window.scrollTo(0, 0);
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  };

  updateVideos = (redirected_page) => {
    this.getVideos(redirected_page);
  }

  componentDidMount() {
    this.getVideos();
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <SearchInput />
          </div>
          <div className="col-md-12">
            <h2>Kết quả cho: {this.props.searchValue}</h2>
            <p>Trang: {this.state.page}</p>
          </div>
          <div className="col-md-12">
            <ul>
              {
                this.state.videos.map((video) => {
                  return (<VideoCard key={video.id} video={video}/>)
                })
              }
            </ul>
            <Pagination parentCallback={this.updateVideos} page={this.state.page} />
          </div>
        </div>
      </div>
    )
  }
  
}

export default VideoList;
