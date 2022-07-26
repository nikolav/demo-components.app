import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clamp, noop } from "../../src/util";
//
// @demo
// https://codesandbox.io/s/musing-lalande-yxyp8d?file=/src/App.js
const clampProgress = (progress) => clamp(progress, 0, 100);
const ProgressRing = ({
  //
  // show/hide
  isActive = true,
  //
  // [0..100]
  progress = 0,
  //
  // ring width [1..100]
  width = 12,
  //
  bg = "lightgray",
  //
  color = "currentcolor",
  //
  // ring animation duration [ms]
  duration = 892,
  //
  //  1, clockwise, default
  // -1, counter-clockwise
  direction = 1,
  //
  // point to animate from
  // [0..360]
  //   top     0
  //   right   90
  //   bottom  180
  //   left    270
  anchor = 0,
  //
  // stroke-line-cap
  //   butt | round [default]
  rounded = true,
  //
  // only allow increasing values
  allowDecrease = false,
  //
  // run callback @animation-frame
  // pass interpolated progress value [0..100]
  onProgress = noop,
  //
  // <svg> classes
  className = "",
  //
  // <circle> svg props
  ...restSvgProps
}) => {
  //
  const [toValue, setToValue] = useState(clampProgress(progress));
  //
  const r = 100 - width / 2;
  const strokeDasharray = Math.PI * 2 * r;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * toValue) / 100;
  //
  const dir = -1 !== direction ? 1 : -1;
  const dur = duration / 1000;
  //
  const onUpdate = useCallback(
    ({ strokeDashoffset }) =>
      onProgress(100 * (1 - strokeDashoffset / strokeDasharray)),
    [strokeDasharray, onProgress]
  );
  //
  useEffect(() => {
    if (isActive) {
      if (progress < toValue && !allowDecrease) return;
      //
      setToValue(clampProgress(progress));
    }
  }, [progress]);
  //
  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.svg
          key="ProgressRing.tbjoyspabnr"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
          viewBox="0 0 200 200"
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          className={className}
        >
          {/*  */}
          {/* background */}
          <circle
            r={r}
            cx={100}
            cy={100}
            fill="none"
            stroke={bg}
            strokeWidth={width}
          />
          {/*  */}
          {/* progress indicator */}
          <motion.circle
            r={r}
            strokeLinecap={true === rounded ? "round" : "butt"}
            cx={100}
            cy={100}
            fill="none"
            stroke={color}
            strokeWidth={width}
            strokeDasharray={strokeDasharray}
            initial={false}
            animate={{
              strokeDashoffset: dir * strokeDashoffset,
              transition: {
                duration: dur,
                ease: "easeOut",
                type: "tween",
              },
            }}
            style={{
              transformOrigin: "center",
              rotate: -90 + anchor,
            }}
            onUpdate={onUpdate}
            {...restSvgProps}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );
};

export default ProgressRing;
