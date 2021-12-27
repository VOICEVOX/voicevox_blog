import * as React from "react"
import PropTypes from "prop-types"
import WebFont from "webfontloader"

import "./layout.scss"

const Layout = ({ children }) => {
  return <div>{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

WebFont.load({
  google: {
    families: ['M PLUS Rounded 1c']
  },
  loading: function () {
    document.documentElement.style.visibility = 'hidden';
  },
  active: function () {
    document.documentElement.style.visibility = 'visible';
  }
});

export default Layout
