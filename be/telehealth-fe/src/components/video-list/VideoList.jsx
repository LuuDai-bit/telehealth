import React from "react"

import VideoCard from './video-card/VideoCard';
import "./video-list.scss";
import Axios from "axios";
import { toast } from "react-toastify";
import SearchInput from '../search-input/SearchInput';
import Pagination from '../pagination/Pagination';

class VideoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      page: 1,
      total: 0,
    };
    this.getTotalVideo();
  }
  
  getVideos = (page=1) => {
    Axios.get(`api/v1/videos/${page}/5`, {
      headers: {
        'jwt-token': localStorage.getItem('jwt')
      }
    })
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

  getTotalVideo = () => {
    Axios.get('api/v1/videos/total', {
      headers: {
        'jwt-token': localStorage.getItem('jwt')
      }
    })
      .then((response) => {
        this.setState({
          total: response.data,
        });
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  }

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
          <div className="col-md-12 border border-secondary rounded">
            <SearchInput />
          </div>
          <div className="col-md-12">
            <h2>Danh sách video (Trang: {this.state.page})</h2>
          </div>
          <div className="col-md-12">
            <ul>
              {
                this.state.videos.map((video) => {
                  return (<VideoCard key={video.id} video={video}/>)
                })
              }
            </ul>
            <Pagination parentCallback={this.updateVideos} 
                        page={this.state.page}
                        total={this.state.total}
            />
          </div>
        </div>
      </div>
    )
  }
  
}

export default VideoList;
