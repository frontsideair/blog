import React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { author } = data.site.siteMetadata

  return (
    <Layout location={location} title={siteTitle}>
      <StaticImage
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../../content/assets/profile-pic.jpg"
        quality={95}
        alt={author.name}
        style={{
          margin: "auto",
          marginBottom: rhythm(1),
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        I'm a full-stack software engineer with a decade-long experience of
        building web based experiences. I love everything about the web; the
        openness, the approachability, the fun. I'm also very passionate about
        quick feedback cycles, correctness of code, consistency of design, and
        accessibility. I'm told that I have excellent communication skills and I
        can guide by asking the right questions. I also can adapt to new
        situations quickly, can perform under uncertainty, and will always
        prioritize customer needs.
      </p>

      <p>
        I got my first computer at the age of 12 and made it go up in flames by
        putting a Nintendo cartridge into the motherboard. After that, I kept my
        damage only to the software, occasionally deleting necessary system
        files. Around that time, I got interested in building websites with
        FrontPage and putting it up using free hosting. Downloading and
        tinkering with whimsical JavaScript snippets was a fun pastime for me.
        Other things that I found fun: bricking my laptop while installing{" "}
        <a href="https://www.debian.org">various</a>{" "}
        <a href="https://www.gentoo.org">Linux</a>{" "}
        <a href="https://archlinux.org">distros</a>, bricking my phone while
        installing{" "}
        <a href="https://en.wikipedia.org/wiki/CyanogenMod">Android mods</a>,
        bricking my MP3 player while installing{" "}
        <a href="https://www.rockbox.org">Rockbox</a> on it, almost bricking my
        girlfriend's camera by asking to install{" "}
        <a href="https://www.magiclantern.fm">Magic Lantern</a> on it. (She
        refused.)
      </p>

      <p>
        Then I got a degree in mechanical engineering. Big mistake, so I spent
        the next{" "}
        <Link to="/why-did-i-spend-most-of-my-summer-studying-right-after-i-graduated/">
          summer studying CS topics
        </Link>{" "}
        and building projects so I could get into software engineering. After
        applying to enough jobs, I finally got in. Since then I've been building
        and finding out better ways to build.
      </p>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo />

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
      author {
        name
        summary
      }
    }
  }
}`
