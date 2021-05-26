import React, { useRef, useState } from "react";
import Sequence from './sequence/Sequence';
import { Link } from "gatsby";
import formatDate from '../../common/date-time.js'

import '../../video-list/video-card/video-card.scss';

class VideoCard extends React.Component {
  render () {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="card">
              <div class="card-horizontal">
                <div class="img-square-wrapper">
                  <Link to="/video" state={{code: this.props.data.video.code, title: this.props.data.video.title}}>
                    <img src="images/anh_nen.jpg" class="card-image" />
                  </Link>
                </div>
                <div class="card-body">
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
              <div class="card-footer">
                <small class="text-muted">Được cập nhật vào: {formatDate(this.props.data.video.updated_at)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCard;
