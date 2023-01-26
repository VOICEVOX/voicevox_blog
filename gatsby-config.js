require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteUrl = process.env.NETLIFY
  ? process.env.DEPLOY_URL
  : process.env.SITE_URL
if (siteUrl == undefined || siteUrl.length == 0) {
  throw new Error("siteUrl is not defined")
}

module.exports = {
  siteMetadata: {
    title: `VOICEVOX`,
    description: `VOICEVOXのホームページ`,
    author: `Hiroshiba Kazuyuki`,
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-svg`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `blurred`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdowns`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `script`,
        path: `${__dirname}/src/scripts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `audio`,
        path: `${__dirname}/src/audios`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-141253083-3"],
        pluginConfig: {
          head: true,
          respectDNT: false,
        },
      },
    },
    `gatsby-plugin-sitemap`,
    {
      // デフォルトではアンダーバーがハイフンに変換されてしまうため
      // slugifyのオプションを上書きしておく。collection routes以外には影響なし
      // ref: https://www.gatsbyjs.com/plugins/gatsby-plugin-page-creator/#options
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        slugify: { separator: "_" },
        ignore:
          process.env.NODE_ENV != "development"
            ? [`**/__thumb_generator/**`]
            : null,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl,
        stripQueryString: true,
      },
    },
    // スタイルが適用される前に画面が表示されてちらつくのを防ぐ
    // `gatsby-plugin-fix-fouc`, // FIXME: フォント容量が減ったら適用しても良いかも
  ],
  graphqlTypegen: true,
}
