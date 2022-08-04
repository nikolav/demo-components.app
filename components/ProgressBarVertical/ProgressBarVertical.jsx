import React, { useState, useEffect, useRef } from "react";
import modcss from "./ProgressBarVertical.module.css";
import { motion } from "framer-motion";
import { noop, clamp } from "../../src/util";
import { useWindowDocument, useStateSwitch } from "../../src/hooks";

//
const percentage = [0, 100];
////
/////
const ProgressBarVertical = ({
  //
  progress = 0,
  //
  width = 12,
  //  bottom | top | center
  anchor = "bottom",
  // allow progress decrease
  allowDecrease = true,
  // track rounded
  rounded = true,
  // thumb color
  color = "currentcolor",
  // track color
  bg = "lightgray",
  // transition duration
  duration = 567,
  // spring | tween
  animation = "tween",
  // apply canvas classes
  className = "",
  // run callback @progress
  onProgress = noop,
  // apply <line> svg props
  ...restLineProps
}) => {
  //
  const [p$, setP] = useState(0);
  const [height$, setHeight] = useState(0);
  const y$ = (p$ * height$) / 100;
  const { isReady } = useWindowDocument();
  const { isActive: isHover$, toggle: toggleHover } = useStateSwitch();
  const yHalf$ = y$ / 2;
  const heightHalf$ = height$ / 2;
  //
  const refCanvas = useRef();
  //
  const widhtHalf = width / 2;
  const animationType =
    "spring" !== animation
      ? {
          type: "tween",
          ease: "easeOut",
        }
      : { type: "spring" };
  const normalizeProgress = (p) => clamp(p, ...percentage);
  //
  const progressLine = () => {
    return "center" === anchor
      ? // center
        {
          y1: heightHalf$ - yHalf$,
          y2: heightHalf$ + yHalf$,
        }
      : "top" !== anchor
      ? // bottom
        {
          y1: height$,
          y2: height$ - y$,
        }
      : // top
        {
          y1: 0,
          y2: y$,
        };
  };
  //
  useEffect(() => {
    if (progress < p$ && !allowDecrease) return;
    //
    setP(normalizeProgress(progress));
  }, [progress, allowDecrease]);
  //
  // canvas.setup @init
  useEffect(() => {
    if (isReady && refCanvas?.current)
      setHeight(refCanvas.current.getBoundingClientRect().height);
  }, [isReady, refCanvas]);
  //
  useEffect(() => {
    onProgress(p$);
  }, [p$]);
  //
  return (
    <svg
      ref={refCanvas}
      viewBox={`0 0 ${width} ${height$}`}
      style={{
        backgroundColor: bg,
      }}
      className={`${modcss.progressvCanvas} ${className}`}
    >
      <motion.line
        strokeWidth={width}
        stroke={color}
        strokeLinecap={rounded ? "round" : "butt"}
        className={`${modcss.progressv} ${
          isHover$ ? modcss.progressvHover : ""
        }`}
        onMouseOver={toggleHover.on}
        onMouseLeave={toggleHover.off}
        //
        x1={widhtHalf}
        x2={widhtHalf}
        initial={false}
        animate={{
          ...progressLine(),
          transition: {
            ...animationType,
            duration: duration / 1000,
          },
        }}
        //
        {...restLineProps}
      />
    </svg>
  );
};

export default ProgressBarVertical;
