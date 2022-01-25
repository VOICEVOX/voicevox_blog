import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <Helmet>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="page-404">
      <h1 className="title is-1">404: Not Found</h1>
      <h2 className="subtitle is-4">Page Not Found</h2>
      <p className="is-size-4">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <Link to="/" className="button m-4">
        Go to TopPage
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
