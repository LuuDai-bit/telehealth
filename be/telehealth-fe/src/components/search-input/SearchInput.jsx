import React from "react";
import { navigate } from "gatsby";
import { toast } from "react-toastify";
import Axios from "axios";
import DatePicker from 'react-datepicker';

import "./search-input.scss";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

toast.configure()

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      content: "",
      created_at_start: "",
      created_at_end: "",
      haha: ""
    };

    this.handleCreatedAtStartChange = this.handleCreatedAtStartChange.bind(this);
    this.handleCreatedAtEndChange = this.handleCreatedAtEndChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  search = () => {
    let content = this.state.content;
    let created_at_start = this.state.created_at_start;
    let created_at_end = this.state.created_at_end;
    let haha = this.state.haha;
    let category = "";
    console.log(content);
    if (this.checkBlank(content, created_at_start, created_at_end, category, haha) && !this.props.searchPage) 
      navigate('/search', {state: {
        content: content || this.state.content,
        duration: haha || this.state.haha,
        created_at_start: created_at_start || this.state.created_at_start, 
        created_at_end: created_at_end || this.state.created_at_end,
        category: category, 
      }});
    else if (this.checkBlank(content, created_at_start, created_at_end, category, haha) && this.props.searchPage) 
      this.props.updateVideos(1, content, created_at_start, created_at_end, category, haha);
    else toast.error("Vui lòng điền vào ô search");
  }

  checkBlank = (content, created_at_start, created_at_end, category, duration) => {
    return !!(content || (created_at_end && created_at_start) || category || duration);
  }

  getCategories = () => {
    Axios.get(`api/v1/categories`, {
      headers: {
        'jwt-token': localStorage.getItem('jwt')
      }
    })
      .then((response) => {
        this.setState({
          categories: response.data
        });
        this.forceUpdate();
      })
      .catch(function (error) {
        toast.error(error.message);
      });
  }

  componentDidMount() {
    this.getCategories()
  }

  handleDurationChange(event) {
    this.setState({
      haha: event.target.value
    });
  }

  handleCreatedAtStartChange(d) {
    this.setState({
      created_at_start: d
    })
  }

  handleCreatedAtEndChange(d) {
    this.setState({
      created_at_end: d
    })
    this.search();
  }

  handleContentChange(d) {
    this.setState({
      content: d.target.value
    })
  }

  render() {
    return (
      <div className="input-group custom-search w-100 d-inline">
        <h2>Tìm kiếm</h2>
        <div className="form-outline">
          <input type="search" 
                 id="#content" 
                 className="form-control search-input" 
                 placeholder="Tìm kiếm nội dung" 
                 value={this.state.content}
                 onChange={this.handleContentChange}
          />
          <button type="button" className="btn btn-primary search-button" onClick={this.search}>
            Tìm kiếm
          </button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <lablel>Chủ đề</lablel>
            <select id="#category" className="form-control" aria-label="Default select example">
              <option value="" selected>Chọn chủ đề</option>
              {
                this.state.categories.map((category) => {
                  return <option key={category.id} value={category.id}>{category.name}</option>
                })
              }
            </select>
          </div>
          <div className="col-md-6">
            <lablel>Thời lượng</lablel>
            <select className="form-control" 
                    value={this.state.haha}
                    onChange={this.handleDurationChange.bind(this)}
            >
              <option value="">Chọn khoảng thời gian</option>
              <option value="short">Dưới 60 phút</option>
              <option value="medium">Từ 1 giờ tới 2 giờ</option>
              <option value="long">Trên 2 giờ </option>
            </select>
          </div>
          <div className="col-md-12">
            <lablel>Ngày tạo</lablel>
          </div>
          <div className="col-md-12 datepicker-group">
            <div className="datepicker-group">
              <DatePicker
                selected={this.state.created_at_start}
                onChange={this.handleCreatedAtStartChange}
                name="startDate"
                dateFormat="dd/MM/yyyy"
              />
              <DatePicker
                selected={this.state.created_at_end}
                onChange={this.handleCreatedAtEndChange}
                name="startDate"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchInput;
