import * as React from "react"

import Layout from "../components/layout"
import SearchResult from "../components/search-result/SearchResult"

const Search = ({ location }) => (
  <Layout>
    <SearchResult content={location.state.content}
                  created_at_start={location.state.created_at_start} 
                  created_at_end={location.state.created_at_end}
                  category={location.state.category}
                  duration={location.state.duration}
    />
  </Layout>
)

export default Search
