import React from "react";
import { Link } from "gatsby";
import FormatDate from '../../common/date-time.js';
import FormatTime from '../../common/format-time.js';

import './video-card.scss';

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
                    <img src="images/anh_nen.jpg" className="card-image" />
                  </Link>
                </div>
                <div className="card-body">
                  <h4>
                    <Link to="/video" state={{
                      code: this.props.video.code, 
                      title: this.props.video.title,
                    }}>
                    {this.props.video.title}
                    </Link>
                  </h4>
                  <p className="card-text">{this.props.video.description || "Không có mô tả"}</p>
                </div>
              </div>
              <div className="card-footer">
                <small className="text-muted">Thời lượng: { FormatTime(this.props.video.duration) }</small>
                &nbsp;
                <small className="text-muted">Được cập nhật vào: { FormatDate(this.props.video.updated_at) }</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCard;
