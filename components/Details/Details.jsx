import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default forwardRef(function Details_(
  {
    // open/close
    isActive,
    // accordion header
    header,
    //
    height = "auto",
    // content
    children,
    //
    // animation in/out speeds/easy
    durationIn = 0.23,
    durationOut = 0.12,
    spring = true,
    //
    // container
    ...rest
  },
  ref
) {
  //
  return (
    <div ref={ref} {...rest}>
      {/*  */}
      {/* render header */}
      {null != header && <header>{header}</header>}
      {/*  */}
      {/* render <Details> content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            animate={{
              opacity: 1,
              height,
              transition: {
                ...(spring
                  ? { type: "spring" }
                  : { type: "tween", ease: "linear" }),
                duration: durationIn,
              },
            }}
            initial={{ opacity: 0, height: 0 }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                ...(spring ? "spring" : { type: "tween", ease: "linear" }),
                duration: durationOut,
              },
            }}
            className="overflow-y-hidden"
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
