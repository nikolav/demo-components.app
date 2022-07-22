import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { noop } from "../../src/util";

//
const IconCrossfade = ({
  i0,
  i1,
  //
  onClick = noop,
  //
  duration = 245,
  //
  ...rest
}) => {
  //
  const [i$, seti] = useState(i0);
  const handle = (...args) => {
    onClick(...args);
    seti(i0.key === i$.key ? i1 : i0);
  };
  //
  return (
    <strong style={{ position: "relative", display: "inline-block" }} {...rest}>
      <AnimatePresence>
        <motion.span
          key={i$.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, position: "initial", zIndez: "initial" }}
          exit={{ opacity: 0, position: "absolute", zIndex: -1 }}
          transition={{ duration: duration / 1000 }}
          onClick={handle}
        >
          {i$.icon}
        </motion.span>
      </AnimatePresence>
    </strong>
  );
};

export default IconCrossfade;
