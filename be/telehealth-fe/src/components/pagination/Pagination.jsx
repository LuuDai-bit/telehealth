import React from "react";

import './pagination.scss';
import 'react-toastify/dist/ReactToastify.css';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      pages: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pages != this.state.pages) {
      let pages = Math.ceil(nextProps.total/5);
      this.setState({
        pages: pages
      })
    }
  }

  componentWillMount() {
    this.setState({
      pages: Math.ceil(this.props.total/5)
    })
  }

  redirect = (event, page, method='') => {
    if (method === 'p') page--;
    else if (method === 'n') page++;
    this.setState({
      page: page
    })
    this.props.parentCallback(page);
  }

  isOnThisPage = (val) => {
    if (this.state.page == val) return 'active';
    return '';
  }

  render() {
    return (
      <div className="flex-container">
        <div className="left">
          <button onClick={(event) => this.redirect(event, this.props.page, "p")}
                  className="btn btn-secondary"
          >Trở lại</button>
        </div>
        <div className="center">
          <ul className="pagination">
            {
              [...Array(this.state.pages).keys()].map(val => {
                return (
                  <li key={val} className={"page-item " + this.isOnThisPage(val+1)}>
                    <button className="page-link" onClick={(event) => this.redirect(event, val+1)}>{val+1}</button>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div className="right">
          <button onClick={(event) => this.redirect(event, this.props.page, "n")}
                  className="btn btn-secondary"
          >Tiếp theo</button>
        </div>
      </div>
    )
  }
}

export default Pagination;
