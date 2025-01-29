import slugify from "slugify"
import extra from "fs-extra"
import cp from "node:child_process"

function template(title, date, summary = "") {
  return `
---
title: "${title}"
date: "${date}"
description: "${summary}"
---
  `.trim()
}

const [title, summary] = process.argv.slice(2)

if (!title) {
  console.log(`Usage: npm run new-post "Post title" "Post summary"`)
} else {
  const slug = slugify(title).toLowerCase()
  const date = new Date().toISOString()
  const path = `content/blog/${slug}/index.md`
  const body = template(title, date, summary)

  try {
    extra.outputFileSync(path, body)
    cp.spawnSync("zed", [path])
    console.log(`Blog entry "${title}" is created at "${path}" successfully!`)
  } catch (error) {
    console.error("Got error while creating blog entry!")
    console.error(error.message)
  }
}
