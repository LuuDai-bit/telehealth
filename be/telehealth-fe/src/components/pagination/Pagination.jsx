import React from "react";
import {toast} from "react-toastify";
import Axios from "axios";

import './pagination.scss';
import 'react-toastify/dist/ReactToastify.css';

class Pagination extends React.Component {
  redirect = (event, page, method='') => {
    if (method === 'p') page--;
    else if (method === 'n') page++;
    console.log(page);
    this.props.parentCallback(page);
  }

  render() {
    return (
      <div className="row">
        <div className="left col-md-6">
          <button onClick={(event) => this.redirect(event, this.props.page, "p")}
                  className="btn btn-secondary"
          >Trở lại</button>
        </div>
        <div className="right col-md-6">
          <button onClick={(event) => this.redirect(event, this.props.page, "n")}
                  className="btn btn-secondary"
          >Tiếp theo</button>
        </div>
      </div>
    )
  }
}

export default Pagination;
