import React, { useRef, useState } from "react";
import {Card, Button} from 'react-bootstrap';
import { Link } from "gatsby";

class VideoCard extends React.Component {
  
  render () {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="card">
              <div class="card-horizontal">
                <div class="img-square-wrapper">
                  <Link to="/video" state={{code: this.props.video.code, title: this.props.video.title}}>
                    <img src="images/not-found-image.jpg" class="card-image" />
                  </Link>
                </div>
                <div class="card-body">
                  <Link to="/video" state={{code: this.props.video.code, title: this.props.video.title}}>
                    {this.props.video.title}
                  </Link>
                  <p class="card-text">{this.props.video.code}</p>
                </div>
              </div>
              <div class="card-footer">
                <small class="text-muted">{this.props.video.updated_at}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCard;
