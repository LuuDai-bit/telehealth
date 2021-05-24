import React, { useRef, useState } from "react"

import VideoCard from './video-card/VideoCard';
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class SearchResult extends React.Component {
  state = {
    data: [],
  };

  getVideos = () => {
    Axios.post('api/v1/videos/search/1/10', {
      "content": this.props.searchValue
    })
      .then((response) => {
        this.setState({
          data: response.data
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
    const ListDatas = this.state.data
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <ul>
              {
                ListDatas.map((data) => {
                  return (<VideoCard key={data.id} data={data}/>)
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
}

export default SearchResult;
