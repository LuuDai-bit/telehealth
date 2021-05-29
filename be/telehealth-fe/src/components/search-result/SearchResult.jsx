import React from "react"

import VideoCard from './video-card/VideoCard';
import Axios from "axios";
import { toast } from "react-toastify";
import SearchInput from '../search-input/SearchInput';
import Pagination from '../pagination/Pagination';

import './search-result.scss';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      total: 0,
      total_sequences: 0,
      time: 0,
      searchValue: this.props.searchValue,
    }
  }

  getVideos = (page=1, searchValue='') => {
    Axios.post(`api/v1/videos/search/${page}/5`, {
      "content": searchValue || this.props.searchValue || ''
    }, {
      headers: {
        'jwt-token': localStorage.getItem('jwt')
      }
    })
      .then((response) => {
        this.setState({
          data: response.data.result,
          page: page,
          total: response.data.total,
          total_sequences: response.data.total_sequences,
          time: response.data.time,
          searchValue: searchValue || this.props.searchValue,
        });
        window.scrollTo(0, 0);
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  };

  updateVideos = (redirected_page, searchValue='') => {
    if (searchValue) {
      this.getVideos(1, searchValue);
      return;
    }
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
            <SearchInput searchPage={true} updateVideos={this.updateVideos} />
          </div>
          <div className="col-md-6">
            <h2>Kết quả cho: {this.state.searchValue} (Trang: {this.state.page})</h2>
          </div>
          <div className="col-md-6 right">
            <span className="info">Tổng cộng {this.state.total_sequences} câu trong {this.state.total} videos</span>
            <span className="info">Tìm kiếm mất {this.state.time} giây</span>
          </div>
          <div className="col-md-12">
            <ul>
              {
                this.state.data.map((data) => {
                  return (<VideoCard key={data.id} data={data}/>)
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

export default SearchResult;
