import PropTypes from "prop-types"
import * as React from "react"
import "./layout.scss"

const Layout = ({ children }) => {
  return <div>{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
