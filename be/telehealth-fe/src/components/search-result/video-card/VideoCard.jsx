import React, { useRef, useState } from "react";
import Sequence from './sequence/Sequence';
import { Link } from "gatsby";
import FormatDate from '../../common/date-time.js';
import FormatTime from '../../common/format-time.js';

import '../../video-list/video-card/video-card.scss';

class VideoCard extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="card">
              <div className="card-horizontal">
                <div className="img-square-wrapper">
                  <Link to="/video" state={{code: this.props.data.video.code, title: this.props.data.video.title}}>
                    <img src="images/anh_nen.jpg" className="card-image" />
                  </Link>
                </div>
                <div className="card-body">
                  <h4>
                    <Link to="/video" state={{
                        code: this.props.data.video.code, 
                        title: this.props.data.video.title,
                      }}>
                      {this.props.data.video.title}
                    </Link>
                  </h4>
                  {
                    this.props.data.sequences.map((sequence) => {
                      return (
                        <Sequence key={sequence.id} 
                                  sequence={sequence} 
                                  code={this.props.data.video.code} 
                                  title={this.props.data.video.title}
                        />
                      )
                    })
                  }
                </div>
              </div>
              <div className="card-footer">
                <small className="text-muted">Thời lượng: { FormatTime(this.props.data.video.duration) }</small>
                &nbsp;
                <small className="text-muted">Được cập nhật vào: { FormatDate(this.props.data.video.updated_at) }</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCard;
