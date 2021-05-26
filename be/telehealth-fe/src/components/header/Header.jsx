import React, {Component} from 'react';
import {MenuItems} from './MenuItems';
import { Link, navigate } from "gatsby";

import './header.scss';

class Header extends Component {
  state = { clicked: false }

  handleClick = () => {
    navigate('/');
  }

  render() {
    return(
      <nav className="navbar-items">
        <h1 className="navbar-logo" onClick={this.handleClick}>Telehealth <i className="fab fa-react"></i></h1>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li>
                <Link key={index} className={item.cName} to={item.url}>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}

export default Header;
