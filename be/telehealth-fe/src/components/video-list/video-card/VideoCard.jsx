import React, { useRef, useState } from "react";
import { Link } from "gatsby";
import formatDate from '../../common/date-time.js';

class VideoCard extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="card">
              <div className="card-horizontal">
                <div className="img-square-wrapper">
                  <Link to="/video" state={{code: this.props.video.code, title: this.props.video.title}}>
                    <img src="images/not-found-image.jpg" class="card-image" />
                  </Link>
                </div>
                <div className="card-body">
                  <Link to="/video" state={{
                      code: this.props.video.code, 
                      title: this.props.video.title,
                    }}>
                    {this.props.video.title}
                  </Link>
                  <p className="card-text">{this.props.video.description || "Không có mô tả"}</p>
                </div>
              </div>
              <div className="card-footer">
                <small className="text-muted">{formatDate(this.props.video.updated_at)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCard;
