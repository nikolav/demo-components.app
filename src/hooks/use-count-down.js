import { useState, useEffect } from "react";
import { noop } from "../util";

const DEFAULT_COUNT = 10;
const DEFAULT_INTERVAL = 1000;
//
const useCountDown = (done = noop) => {
  const [i, seti] = useState();
  const [c, setc] = useState();
  const [isRunning, setIsRunning] = useState();
  //
  useEffect(() => {
    if (0 === c) {
      stop_();
      done();
    }
  }, [c]);
  //
  return {
    count: c,
    isRunning,
    start: start_,
    stop: stop_,
  };
  //
  function start_(from = DEFAULT_COUNT, ms = DEFAULT_INTERVAL) {
    if (!isRunning) {
      setc(from);
      seti(setInterval(tick_, ms));
      //
      setIsRunning(true);
    }
    return stop_;
  }
  function stop_() {
    clearInterval(i);
    setc(null);
    //
    setIsRunning(false);
  }
  function tick_() {
    setc((c) => c - 1);
  }
};

export default useCountDown;
