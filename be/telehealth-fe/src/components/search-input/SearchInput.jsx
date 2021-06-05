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

  search = (duration='', created_at_start='', created_at_end='', category='') => {
    let content = document.getElementById('#content').value;
    console.log(this.checkBlank(content, created_at_start, created_at_end, category, duration));
    if (this.checkBlank(content, created_at_start, created_at_end, category, duration) && !this.props.searchPage) 
      navigate('/search', {state: {
        searchValue: content,
        created_at_start: created_at_start, 
        created_at_end: created_at_end,
        category: category, 
        length: duration,
      }});
    else if (this.checkBlank(content, created_at_start, created_at_end, category, duration) && this.props.searchPage) 
      this.props.updateVideos(1, content, created_at_start, created_at_end, category, duration);
    else toast.error("Vui lòng điền vào ô search");
  }

  checkBlank = (content, created_at_start, created_at_end, category, length) => {
    return !!(content || (created_at_end && created_at_start) || category || length);
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

  handleLengthChange(event){
    this.search(event.target.value);
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
            <select id="#length" 
                    className="form-control" 
                    aria-label="Default select example" 
                    value=""
                    onChange={this.handleLengthChange.bind(this)}
            >
              <option value="">Chọn khoảng thời gian</option>
              <option value="short">Dưới 60 phút</option>
              <option value="medium">Từ 1 giờ tới 2 giờ</option>
              <option value="long">Trên 2 giờ </option>
            </select>
          </div>
          <div className="col-md-12">
            <lablel>Ngày tạo</lablel>
            <div className="custom-flex">
              <select id="#created_at_start" className="form-control" aria-label="Default select example">
                <option value="">Từ ngày</option>
                <option value="1">Dưới 60 phút</option>
                <option value="2">Từ 1 giờ tới 2 giờ</option>
                <option value="3">Trên 2 giờ </option>
              </select>
              <div className="gap">
                <p><i className='fas fa-arrow-alt-circle-right'></i></p>
              </div>
              <select id="#created_at_end" className="form-control" aria-label="Default select example">
                <option value="">Tới ngày</option>
                <option value="1">Dưới 60 phút</option>
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
