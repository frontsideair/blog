const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const rewrites = require("./rewrites.json")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  rewrites.forEach((redirect) =>
    createRedirect({
      fromPath: redirect.source,
      toPath: redirect.destination,
      statusCode: 200,
    })
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export const onCreatePage = ({ page, actions }) => {
  const { deletePage, createPage } = actions

  if (page.path === "/404/" || page.path === "/dev-404-page/") {
    const newPage = { ...page }
    newPage.matchPath = "/^((?!/va/script.js).)*$/"

    deletePage(page)
    createPage(newPage)
  }
}
