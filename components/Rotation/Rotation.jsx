import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { prevent, noop, arrayRand, has } from "../../src/util";
import { useTimer, useIsMounted } from "../../src/hooks";

// [sec.]
const DEFAULT_ROTATION_TIMEOUT = 5;
const DEFAULT_ROTATION_EFFECT = "fade";
const ROTATION_EFFECT = {
  fade: {
    initial: { opacity: 0 },
    exit: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 34 },
    exit: { opacity: 0, x: -12, transition: { duration: 0.1 } },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: 0.24 },
    },
  },
};

export default function Rotation({
  //
  // Array<{ key: string.unique, node: Node|Component, [ ...rest: any ] }>
  nodes = [],
  //
  // [sec]
  timeout = DEFAULT_ROTATION_TIMEOUT,
  //
  // string
  effect = DEFAULT_ROTATION_EFFECT,
  //
  onClick = noop,
  //
  // manual mode
  // doesnt auto start
  // loads slides in .useEffect
  // ..when load<IncomingSlide> value changes outside.. `@Date.now()`
  manual = false,
  // string.unique*
  loadNext = null,
  loadPrev = null,
  loadRandom = null,
  // { slide: number, key: string.unique }
  loadSlide = null,
  //
  // @next; skip to 0 if @end
  // @prev; skip to @end if 0
  loop = false,
  // number; load @mount
  startIndex = null,
  //
  // access current slider state
  // pass callback to .debug
  // { debug: access(state@slider), key: string.unique }
  onDebug = null,
  //
  ...rest
}) {
  const NODES = useRef(nodes).current;
  //
  const isMounted = useIsMounted();
  const [active, setActive] = useState(
    null != startIndex ? NODES[startIndex] : arrayRand(NODES)
  );
  //
  // slider navigation, nex, prev, random, goTo
  const nextNodeRandom = () => {
    let node = active;

    if (1 < NODES.length) {
      while (node === active) {
        node = arrayRand(NODES);
      }
    }
    setActive(node);
  };
  const nextNode = () => {
    let node = active;
    const len = NODES.length;
    const index = NODES.indexOf(node);
    const indexNext = 1 + index;
    //
    if (1 < len) {
      if (indexNext < len) {
        node = NODES[indexNext];
      } else if (true === loop) {
        node = NODES[0];
      }
      setActive(node);
    }
  };
  const prevNode = () => {
    let node = active;
    const len = NODES.length;
    const index = NODES.indexOf(node);
    //
    if (1 < len) {
      if (0 < index) {
        node = NODES[index - 1];
      } else if (true === loop) {
        node = NODES[len - 1];
      }
      setActive(node);
    }
  };
  //
  const timerControls = useTimer(nextNodeRandom);
  const slideshowStart = timerControls.start.bind(
    null,
    parseInt(timeout, 10) * 1000
  );
  useEffect(() => {
    if (isMounted && !manual) slideshowStart();
    return timerControls.stop;
  }, [isMounted]);
  //
  //
  useEffect(() => {
    if (null != loadNext) nextNode();
  }, [loadNext]);
  useEffect(() => {
    if (null != loadPrev) prevNode();
  }, [loadPrev]);
  useEffect(() => {
    if (null != loadRandom) nextNodeRandom();
  }, [loadRandom]);
  // { slide: number, key: string.unique }
  useEffect(() => {
    if (null != loadSlide) setActive(NODES[loadSlide.slide]);
  }, [loadSlide?.key]);
  // { debug: func(state@slider), key: string.unique }
  useEffect(() => {
    if (null != onDebug)
      onDebug.debug({
        active,
        effect,
        index: NODES.indexOf(active),
        isRunning: timerControls.running,
        loop,
        manual,
        nodes: [...NODES],
        startIndex,
        timeout,
        total: NODES.length,
      });
  }, [onDebug?.key]);
  //
  if (!has(ROTATION_EFFECT, effect)) effect = DEFAULT_ROTATION_EFFECT;
  //
  return 0 < NODES.length ? (
    <AnimatePresence initial={false}>
      <div
        style={{
          position: "relative",
          margin: 0,
          padding: 0,
        }}
        onMouseOver={() => !manual && timerControls.stop()}
        onMouseLeave={() => !manual && slideshowStart()}
        onClick={prevent(() => onClick(active))}
        {...rest}
      >
        <motion.div
          key={active.key}
          className="absolute inset-0 ***h-full"
          initial={ROTATION_EFFECT[effect].initial}
          exit={ROTATION_EFFECT[effect].exit}
          animate={ROTATION_EFFECT[effect].animate}
        >
          {active.node}
        </motion.div>
      </div>
    </AnimatePresence>
  ) : null;
}
