import React, { useRef, useState } from "react"

import VideoCard from './video-card/VideoCard';
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SearchInput from '../search-input/SearchInput';
import Pagination from '../pagination/Pagination';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1
    }
  }

  getVideos = (page=1) => {
    Axios.post(`api/v1/videos/search/${page}/5`, {
      "content": this.props.searchValue
    })
      .then((response) => {
        this.setState({
          data: response.data,
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
    const ListDatas = this.state.data
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
                ListDatas.map((data) => {
                  return (<VideoCard key={data.id} data={data}/>)
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

export default SearchResult;
