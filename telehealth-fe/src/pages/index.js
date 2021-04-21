import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ResponsivePlayer from "../components/video/ResponsivePlayer"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ResponsivePlayer />
  </Layout>
)

export default IndexPage
