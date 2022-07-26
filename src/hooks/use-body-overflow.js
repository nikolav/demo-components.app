import { useState, useEffect } from "react";
import { useWindowDocument } from "./use-window";
import { assign, addClass, hasClass, removeClass } from "../util";

const OVERFLOW_HIDDEN_CLASS = "overflow-hidden";

//
const useBodyOverflow = () => {
  const [overflowHidden, setOverflowHidden] = useState();
  const { isMounted, document } = useWindowDocument();
  //
  const body = document?.body;
  //
  // @init
  useEffect(() => {
    isMounted &&
      body &&
      setOverflowHidden(hasClass(body, OVERFLOW_HIDDEN_CLASS));
  }, [isMounted, body]);
  //
  // @update
  useEffect(() => {
    if (isMounted && body) {
      if (overflowHidden) {
        addClass(body, OVERFLOW_HIDDEN_CLASS);
        return;
      }
      //
      removeClass(body, OVERFLOW_HIDDEN_CLASS);
    }
  }, [overflowHidden, isMounted, body]);
  //
  return assign(() => overflowHidden, {
    hidden: (isHidden) => setOverflowHidden(true === isHidden),
  });
};

//
export default useBodyOverflow;
