export interface NewsPostResult {
  allMarkdownRemark: {
    edges: {
      node: {
        frontmatter: {
          slug: string
        }
      }
    }[]
  }
}
