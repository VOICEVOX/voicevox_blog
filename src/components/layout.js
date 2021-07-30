import * as React from "react"
import PropTypes from "prop-types"

import "./layout.scss"

const Layout = ({ children }) => {
  return <div>{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
