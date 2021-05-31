import React from "react";
import { navigate } from "gatsby";
import { toast } from "react-toastify";
import Axios from "axios";

import "./search-input.scss";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    }
  }

  search = () => {
    let content = document.getElementById('#content').value;
    let created_at_start = document.getElementById('#created_at_start').value;
    let created_at_end = document.getElementById('#created_at_end').value;
    let category = document.getElementById('#category').value;
    let length = document.getElementById('#length').value;
    
    if (this.checkBlank(content, created_at_start, created_at_end, category, length) && !this.props.searchPage) 
      navigate('/search', {state: {
        searchValue: content,
        created_at_start: created_at_start, 
        created_at_end: created_at_end,
        category: category, 
        length: length
      }});
    else if (this.checkBlank(content, created_at_start, created_at_end, category, length) && this.props.searchPage) 
      this.props.updateVideos(1, content, created_at_start, created_at_end, category, length);
    else toast.error("Vui lòng điền vào ô search");
  }

  checkBlank = (content, created_at_start, created_at_end, category, length) => {
    return content || (created_at_end && created_at_start) || category || length;
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

  render() {
    return (
      <div className="input-group custom-search w-100 d-inline">
        <h2>Tìm kiếm</h2>
        <div className="form-outline">
          <input type="search" id="#content" className="form-control search-input" placeholder="Tìm kiếm nội dung" />
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
            <select id="#length" className="form-control" aria-label="Default select example">
              <option value="" selected>Chọn khoảng thời gian</option>
              <option value="1">Dưới 30 phút</option>
              <option value="2">Từ 1 giờ tới 2 giờ</option>
              <option value="3">Trên 2 giờ </option>
            </select>
          </div>
          <div className="col-md-12">
            <lablel>Ngày tạo</lablel>
            <div className="custom-flex">
              <select id="#created_at_start" className="form-control" aria-label="Default select example">
                <option value="" selected>Từ ngày</option>
                <option value="1">Dưới 30 phút</option>
                <option value="2">Từ 1 giờ tới 2 giờ</option>
                <option value="3">Trên 2 giờ </option>
              </select>
              <div className="gap">
                <p><i className='fas fa-arrow-alt-circle-right'></i></p>
              </div>
              <select id="#created_at_end" className="form-control" aria-label="Default select example">
                <option value="" selected>Tới ngày</option>
                <option value="1">Dưới 30 phút</option>
                <option value="2">Từ 1 giờ tới 2 giờ</option>
                <option value="3">Trên 2 giờ </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchInput;
