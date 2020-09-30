import React, { useEffect, useState, useRef } from "react";
import { lineRadial, curveLinearClosed } from "d3-shape";

const Canvas = (props) => {
  const [currentDim, setCurrentDim] = useState({});
  const [inter, setInter] = useState(0);
  const canvas = useRef(null);
  const { dim } = props;
  function drawCanvas(canvas) {
    if (!dim.wid || dim.wid === currentDim.wid) {
      return;
    }
    canvas.width = dim.wid;
    canvas.height = dim.hei;
    const context = canvas.getContext("2d");
    if (currentDim.wid > 0) {
      let { wid, hei } = currentDim;
      context.clearRect(0, 0, wid, hei);
      context.beginPath();
      clearInterval(inter);
    }
    setCurrentDim({ wid: dim.wid, hei: dim.hei });
    const colors = ["cyan", "magenta", "yellow"];
    const shift = (2 * Math.PI) / 3;
    const speed = 1 / 1000;
    const frequency = 8;
    const amplitude = canvas.width < 600 || canvas.height < 500 ? 5 : 15;
    const radius = Math.min(canvas.width, canvas.height) / 2 - amplitude * 2;
    const n = 360;
    const line = lineRadial()
      .context(context)
      .curve(curveLinearClosed)
      .angle((r, i) => (i * 2 * Math.PI) / n)
      .radius((r) => r);
    function* generator() {
      while (true) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.lineWidth = canvas.width < 600 || canvas.height < 500 ? 2 : 6;
        context.lineJoin = "round";
        context.globalCompositeOperation = "darken";
        colors.forEach((color, j) => {
          context.beginPath();
          line(
            Float64Array.from({ length: n }, (_, i) => {
              const a = (i * 2 * Math.PI) / n;
              const t = performance.now() * speed;
              const c = Math.cos(a * frequency - j * shift + t);
              const p = Math.pow((1 + Math.cos(a - t)) / 2, 3);
              return radius + amplitude * c * p;
            })
          );
          context.strokeStyle = color;
          context.stroke();
        });
        context.restore();
        yield context.canvas;
      }
    }
    const draw = generator();
    const int = setInterval(() => {
      draw.next();
    }, 100);
    setInter(int);
  }
  const debounce = (func) => {
    let timer;
    return (event) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(func, 100, event);
    };
  };
  useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(() => {
        drawCanvas(canvas.current);
      })
    );
  }, []);
  useEffect(() => {
    drawCanvas(canvas.current);
    return window.removeEventListener("resize", () => {});
  }, [dim]);

  return <canvas id="sandbox" ref={canvas}></canvas>;
};
export default Canvas;
