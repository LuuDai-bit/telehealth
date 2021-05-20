import * as React from "react"

import Layout from "../components/layout"
import ResponsivePlayer from "../components/video/ResponsivePlayer"

const VideoPage = ({ location }) => (
  <Layout>
    <p>{location.state.code}</p>
    <ResponsivePlayer code={location.state.code}/>
  </Layout>
)

export default VideoPage
