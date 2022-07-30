/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { has, noop } from "../../src/util";

//
const styleSwitchIconWidget = css`
  position: relative;
  display: inline-block;
`;
//
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

// toggle multiple icons in map @icons
//  pass .icon name to turn on
export const SwitchIcon = ({
  //
  // {[key: string.unique]: Icon}
  icons = {},
  //
  // string.key @icons
  icon = null,
  //
  duration = 122,
  //
  ...rest
}) => {
  //
  const i = useRef(icons).current;
  const [i$, seti] = useState(icons);
  //
  useEffect(() => {
    has(i, icon) && seti({ key: icon, icon: i[icon] });
  }, [icon]);
  //
  //
  return (
    <strong css={css(styleSwitchIconWidget)} {...rest}>
      <AnimatePresence>
        <motion.span
          key={i$.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, position: "initial", zIndez: "initial" }}
          exit={{ opacity: 0, position: "absolute", zIndex: -1 }}
          transition={{ duration: duration / 1000 }}
        >
          {i$.icon}
        </motion.span>
      </AnimatePresence>
    </strong>
  );
};

//
export default IconCrossfade;
