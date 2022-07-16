import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Details = ({
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
}) => {
  //
  return (
    <div className="m-0 p-0" {...rest}>
      {/*  */}
      {/* render header */}
      {null != header && <div>{header}</div>}
      {/*  */}
      {/* render <Details> content */}
      <AnimatePresence initial={false}>
        {true === isActive && (
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
};

export default Details;
