import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Separator from "../components/separator"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { title: siteTitle, siteUrl, social } = data.site.siteMetadata
  const { title, description, date } = post.frontmatter
  const { previous, next } = pageContext
  const postUrl = siteUrl + post.fields.slug

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description={description || post.excerpt} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {date}
            <Separator />
            {post.timeToRead} minutes to read
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://mobile.twitter.com/intent/tweet?text=${title}&url=${postUrl}&via=${social.twitter}`}
        >
          Share on Twitter
        </a>
        <Separator />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${social.github}/blog/edit/master/content/blog${post.fields.slug}index.md`}
        >
          Edit on GitHub
        </a>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        social {
          twitter
          github
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        slug
      }
      timeToRead
    }
  }
`
