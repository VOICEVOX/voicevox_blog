/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const characterKeys = [
    "四国めたん",
    "ずんだもん",
    "春日部つむぎ",
    "雨晴はう",
    "波音リツ",
    "玄野武宏",
    "白上虎太郎",
    "青山龍星",
    "冥鳴ひまり",
    "九州そら",
    "モチノキョウコ",
    "剣崎雌雄",
    "WhiteCUL",
    "後鬼",
    "No7",
  ]
  characterKeys.forEach(key => {
    actions.createPage({
      path: `/dormitory/${key}`,
      component: path.resolve("./src/pages/dormitory.tsx"),
      context: {
        initialSelectedCharacterKey: key,
      },
    })
  })
}
