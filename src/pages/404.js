import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Canvas from "../components/Canvas"
import { getCorrectDimension } from "../utils/utils.js"

const NotFoundPage = () => {
  const [dim, setDim] = useState({})
  async function getDimentions() {
    let wid = await getCorrectDimension("width")
    let hei = await getCorrectDimension("height")
    return setDim({ wid, hei })
  }
  useEffect(() => {
    getDimentions()
    window.addEventListener("resize", getDimentions)
    return window.removeEventListener("resize", () => {})
  }, [])
  return (
    <div>
      <Seo title="404: Not found" />
      <Canvas dim={dim} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>Page Not Found</h3>
        <Link to="/">Voltar para home</Link>
      </div>
    </div>
  )
}

export default NotFoundPage
