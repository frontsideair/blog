import React from "react"
import { useState } from "react"
import { sample, shuffle, capitalize } from "lodash"
import anagrams from "../utils/anagrams.json"

export function Anagram({ children }) {
  const [state, setState] = useState(children)
  function handleClick() {
    setState(
      shuffle(sample(anagrams))
        .map(capitalize)
        .join(" ")
    )
  }
  return (
    <button
      style={{ border: 0, padding: 0, background: "none" }}
      onClick={handleClick}
    >
      {state}
    </button>
  )
}
