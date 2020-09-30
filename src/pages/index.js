import React, { useEffect, useState } from "react";
import Seo from '../components/seo'
import Canvas from "../components/Canvas";
import Header from "../components/Header";
import { getCorrectDimension } from "../utils/utils.js";
import "../styles/styles.css";

const Index = () => {
  const [dim, setDim] = useState({});
  async function getDimentions() {
    let wid = await getCorrectDimension("width");
    let hei = await getCorrectDimension("height");
    return setDim({ wid, hei });
  }
  useEffect(() => {
    getDimentions();
    window.addEventListener("resize", getDimentions);
    return window.removeEventListener("resize", () => {});
  }, []);
  return (
    <div>
      <Seo />
      <Canvas dim={dim} />
      <Header />
    </div>
  );
};
export default Index;
