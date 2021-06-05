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
      content: this.props.content || "",
      created_at_start: this.props.created_at_start || "",
      created_at_end: this.props.created_at_end || "",
      category: this.props.category || "",
      duration: this.props.duration || ""
    }
  }

  getVideos = (page=1, content='', created_at_start='', created_at_end='', category='', duration='') => {
    Axios.post(`api/v1/videos/search/${page}/5`, {
      "content": content || this.state.content || '',
      "created_at_start": created_at_start || this.state.created_at_start,
      "created_at_end": created_at_end || this.state.created_at_end,
      "category": category || this.state.category,
      "duration": duration || this.state.duration
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
          content: content || this.state.content,
        });
        window.scrollTo(0, 0);
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  };

  updateVideos = (redirected_page, content='', created_at_start='', created_at_end='', category='', duration='') => {
    if (content) {
      this.getVideos(1, content, created_at_start, created_at_end, category, duration);
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
          <div className="col-md-12 border border-secondary rounded">
            <SearchInput searchPage={true} updateVideos={this.updateVideos} />
          </div>
          <div className="col-md-6">
            <h2>Kết quả cho: {this.state.content} (Trang: {this.state.page})</h2>
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
