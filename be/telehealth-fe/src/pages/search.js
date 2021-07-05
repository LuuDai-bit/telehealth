import * as React from "react"

import Layout from "../components/layout"
import SearchResult from "../components/search-result/SearchResult"

const Search = ({ location }) => (
  <Layout>
    <SearchResult content={location.state.content}
                  category={location.state.category}
                  duration={location.state.duration}
    />
  </Layout>
)

export default Search
