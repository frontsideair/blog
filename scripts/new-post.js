const slugify = require("slugify")
const fs = require("fs-extra")
const cp = require("child_process")

function template(title, date, summary = "") {
  return `
---
title: ${title}
date: "${date}"
description: "${summary}"
---
  `.trim()
}

const title = process.argv[2]
const summary = process.argv[3]

if (!title) {
  console.log(`Usage: npm run new-post "Post title" "Post summary"`)
} else {
  const slug = slugify(title).toLowerCase()
  const date = new Date().toISOString()
  const path = `content/blog/${slug}/index.md`
  const body = template(title, date, summary)

  try {
    fs.outputFileSync(path, body)
    cp.spawnSync("code", [path])
    console.log(`Blog entry "${title}" is created at "${path}" successfully!`)
  } catch (error) {
    console.error("Got error while creating blog entry!")
    console.error(error.message)
  }
}
