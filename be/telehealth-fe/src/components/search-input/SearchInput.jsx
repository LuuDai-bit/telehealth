import React from "react";
import { navigate } from "gatsby";
import { toast } from "react-toastify";

import "./search-input.scss";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

toast.configure()

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      duration: "",
      search_operator: ""
    };

    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSearchOperatorChange = this.handleSearchOperatorChange.bind(this);
  }

  search = () => {
    let content = this.state.content;
    let created_at_start = this.state.created_at_start;
    let created_at_end = this.state.created_at_end;
    let duration = this.state.duration;
    let search_operator = this.state.search_operator;
    let category = "";
    
    if (this.checkBlank(content, created_at_start, created_at_end, category, duration) && !this.props.searchPage) 
      navigate('/search', {state: {
        content: content || this.state.content,
        duration: duration || this.state.duration,
        search_operator: search_operator || this.state.search_operator,
      }});
    else if (this.checkBlank(content, created_at_start, created_at_end, category, duration) && this.props.searchPage) 
      this.props.updateVideos(1, content, created_at_start, created_at_end, category, duration, search_operator);
    else toast.error("Vui lòng điền vào ô search");
  }

  checkBlank = (content, created_at_start, created_at_end, category, duration) => {
    return !!(content || (created_at_end && created_at_start) || category || duration);
  }

  // getCategories = () => {
  //   Axios.get(`api/v1/categories`, {
  //     headers: {
  //       'jwt-token': localStorage.getItem('jwt')
  //     }
  //   })
  //     .then((response) => {
  //       this.setState({
  //         categories: response.data
  //       });
  //       this.forceUpdate();
  //     })
  //     .catch(function (error) {
  //       toast.error(error.message);
  //     });
  // }

  componentDidMount() {
    // this.getCategories()
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    });
  }

  handleContentChange(d) {
    this.setState({
      content: d.target.value
    })
  }

  handleSearchOperatorChange(d) {
    this.setState({
      search_operator: d.target.value
    })
  }

  render() {
    return (
      <div className="input-group custom-search w-100 d-inline">
        <h2>Tìm kiếm</h2>
        <div className="form-outline">
          <select className="form-control w-21"
                  value={this.state.search_operator}
                  onChange={this.handleSearchOperatorChange.bind(this)}
          >
            <option value="and">Cụm từ</option>
            <option value="or">Từng từ</option>
          </select>
          <input type="search" 
                 id="#content" 
                 className="form-control search-input" 
                 placeholder="Tìm kiếm nội dung" 
                 value={this.state.content}
                 onChange={this.handleContentChange}
          />
          <button type="button" className="btn btn-primary search-button" onClick={this.search}>
            <i class="fa fa-search"></i>
          </button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <lablel>Thời lượng</lablel>
            <select className="form-control" 
                    value={this.state.duration}
                    onChange={this.handleDurationChange.bind(this)}
            >
              <option value="">Chọn khoảng thời gian</option>
              <option value="short">Dưới 60 phút</option>
              <option value="medium">Từ 1 giờ tới 2 giờ</option>
              <option value="long">Trên 2 giờ </option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchInput;
