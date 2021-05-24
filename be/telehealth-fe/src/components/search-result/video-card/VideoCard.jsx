import React, { useRef, useState } from "react";
import Sequence from './sequence/Sequence';
import { Link } from "gatsby";
import formatDate from '../../common/date-time.js'

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
                    <img src="images/not-found-image.jpg" class="card-image" />
                  </Link>
                </div>
                <div class="card-body">
                  <Link to="/video" state={{
                      code: this.props.data.video.code, 
                      title: this.props.data.video.title,
                    }}>
                    {this.props.data.video.title}
                  </Link>
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
                <small class="text-muted">{formatDate(this.props.data.video.updated_at)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCard;
