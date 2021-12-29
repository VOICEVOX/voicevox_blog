import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, lang, meta, title, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={null}
      meta={[
        {
          name: "http-equiv='Content-Security-Policy'",
          content: "default-src 'self'",
        },
        {
          name: "http-equiv='Content-Security-Policy'",
          content: "upgrade-insecure-requests",
        },
        {
          name: "http-equiv='Permissions-Policy'",
          content: "interest-cohort=()",
        },
        {
          name: "http-equiv='X-FRAME-OPTIONS'",
          content: "DENY",
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: image ? `summary_large_image` : `summary`,
        },
        // {
        //   name: `twitter:creator`,
        //   content: site.siteMetadata?.author || ``,
        // },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          image
            ? [
                {
                  name: `og:image`,
                  content: `${site.siteMetadata.siteUrl}${image}`,
                },
              ]
            : []
        )
        .concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
  image: undefined,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
}

export default Seo
