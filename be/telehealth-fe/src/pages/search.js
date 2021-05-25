import * as React from "react"

import Layout from "../components/layout"
import SearchResult from "../components/search-result/SearchResult"

const Search = ({ location }) => (
  <Layout>
    <SearchResult searchValue={location.state.searchValue}/>
  </Layout>
)

export default Search
