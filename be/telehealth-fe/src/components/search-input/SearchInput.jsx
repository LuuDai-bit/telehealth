import React, { useRef, useState } from "react";
import { Link, navigate } from "gatsby";
import { ToastContainer, toast } from "react-toastify";

import "./search-input.scss";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class SearchInput extends React.Component {
  search = (e) => {
    let searchValue = document.getElementById('#search').value;
    if (searchValue) navigate('/search', {state: {searchValue: searchValue}});
    else toast.error("Vui lòng điền vào ô search");
  }

  render() {
    return (
      <div className="input-group custom-search">
        <div className="form-outline">
          <input type="search" id="#search" className="form-control" />
        </div>
        <button type="button" className="btn btn-primary" onClick={this.search}>
          Tìm kiếm
        </button>
      </div>
    )
  }
}

export default SearchInput;
