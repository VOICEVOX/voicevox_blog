module.exports = {
  plugins: [
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
