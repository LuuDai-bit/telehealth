import * as React from "react"

import Layout from "../components/layout"
import ResponsivePlayer from "../components/video/ResponsivePlayer"

const VideoPage = ({ location }) => (
  <Layout>
    <h2>{location.state.title}</h2>
    <ResponsivePlayer code={location.state.code} time={location.state.time}/>
  </Layout>
)

export default VideoPage
