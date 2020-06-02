import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Separator from "./separator"
import { rhythm, scale } from "../utils/typography"
import { Anagram } from "./anagram"

function Newsletter() {
  const paddingX = rhythm(1 / 2)
  const buttonWidth = rhythm(4)
  const height = rhythm(1.5)
  const border = "1px solid"

  return (
    <section>
      <h3>Newsletter</h3>
      <p>Please subscribe to get new posts right to your inbox.</p>

      <form
        action="https://tinyletter.com/frontsideair"
        method="post"
        target="popupwindow"
      >
        <section style={{ position: "relative", maxWidth: rhythm(12) }}>
          <input
            type="email"
            name="email"
            aria-label="Email"
            placeholder="you@yoursite.com"
            required
            style={{
              height,
              border,
              borderRadius: 0,
              width: "100%",
              paddingLeft: paddingX,
              paddingRight: buttonWidth + paddingX,
            }}
          />
          <input type="hidden" value="1" name="embed" />
          <button
            type="submit"
            style={{
              height,
              border,
              borderRadius: 0,
              position: "absolute",
              right: 0,
              width: buttonWidth,
            }}
          >
            Subscribe
          </button>
        </section>
        <small>I promise I won't send you spam or sell your email.</small>
      </form>
    </section>
  )
}

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        <Newsletter />
        <div style={{ display: "flex" }}>
          <a href={`https://mobile.twitter.com/${social.twitter}`}>Twitter</a>
          <Separator />
          <a href={`https://github.com/${social.github}`}>GitHub</a>
          <span style={{ flexGrow: 1 }} />
          <a href="/rss.xml">RSS</a>
        </div>
        <div style={{ textAlign: "center", marginTop: rhythm(2) }}>
          Made with ❤ by <Anagram>Fatih Altinok</Anagram>.
        </div>
      </footer>
    </div>
  )
}

export default Layout
