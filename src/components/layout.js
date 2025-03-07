import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Separator from "./separator"
import { rhythm, scale } from "../utils/typography"

function Newsletter() {
  const paddingX = 1 / 2
  const buttonWidth = 4
  const height = rhythm(1.5)
  const border = "1px solid"

  return (
    <section id="newsletter">
      <h3>Newsletter</h3>
      <p>
        Please subscribe to get new posts and monthly updates right to your
        inbox.
      </p>

      <form
        action="https://buttondown.email/api/emails/embed-subscribe/frontsideair"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://buttondown.email/frontsideair', 'popupwindow')"
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
              paddingLeft: rhythm(paddingX),
              paddingRight: rhythm(buttonWidth + paddingX),
            }}
          />
          <button
            type="submit"
            style={{
              height,
              border,
              borderRadius: 0,
              position: "absolute",
              right: 0,
              width: rhythm(buttonWidth),
            }}
          >
            Subscribe
          </button>
        </section>
        <small>
          I promise I won't send you spam or sell your email.{" "}
          <a
            href="https://buttondown.email/refer/frontsideair"
            target="_blank"
            rel="noreferrer"
          >
            Powered by Buttondown.
          </a>
        </small>
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
            bluesky
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
          <a href={`https://bsky.app/profile/${social.bluesky}`}>Bluesky</a>
          <Separator />
          <a href={`https://github.com/${social.github}`}>GitHub</a>
          <span style={{ flexGrow: 1 }} />
          <a href="/rss.xml">RSS</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
