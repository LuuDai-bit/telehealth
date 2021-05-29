import React from "react";
import { navigate } from "gatsby";
import { toast } from "react-toastify";

import "./search-input.scss";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class SearchInput extends React.Component {
  search = () => {
    let searchValue = document.getElementById('#search').value;
    if (searchValue && !this.props.searchPage) navigate('/search', {state: {searchValue: searchValue}});
    else if (searchValue && this.props.searchPage) this.props.updateVideos(1, searchValue);
    else toast.error("Vui lòng điền vào ô search");
  }

  render() {
    return (
      <div className="input-group custom-search w-100 d-inline">
        <div className="form-outline">
          <input type="search" id="#search" className="form-control search-input" placeholder="Tìm kiếm nội dung" />
          <button type="button" className="btn btn-primary search-button" onClick={this.search}>
            Tìm kiếm
          </button>
        </div>
      </div>
    )
  }
}

export default SearchInput;
