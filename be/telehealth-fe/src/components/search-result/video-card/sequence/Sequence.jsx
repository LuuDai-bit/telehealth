import React, { useRef, useState } from "react";
import { Link } from "gatsby";

import './sequence.scss';

class Sequence extends React.Component {
  formatTime = (totalSecond) => {
    let hrs = ~~(totalSecond / 3600);
    let mins = ~~((totalSecond % 3600) / 60);
    let secs = ~~totalSecond % 60;

    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  createMarkup = (sequence) => {
    return {__html: sequence};
  }
  
  render() {
    return (
      <p className="card-text">
        <Link to="/video" state={
            {
              code: this.props.code, 
              title: this.props.title,
              time: this.props.sequence.start_at
            }
          }
        >
          {this.formatTime(this.props.sequence.start_at)}: <span dangerouslySetInnerHTML={this.createMarkup(this.props.sequence.result)}></span>
        </Link>
      </p>
    )
  }
}

export default Sequence;
