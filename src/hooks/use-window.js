import { useEffect, useState, createContext, useContext } from "react";
import useIsMounted from "./use-is-mounted";
import { useJQuery } from "./use-jquery";
import ready from "../util/ready";
import { debounce } from "../util";

//
export const useWindow = () => {
  const [w$, setW] = useState(null);
  const isWindow = "undefined" !== typeof window;
  //
  useEffect(() => {
    isWindow && setW(window);
  }, [isWindow]);
  //
  return w$;
};
//
// schedule callback to run in window .env
// take additionl flag to handle component window init @mount
//   e: string.event-name;
//   run: (evt: Event) => any; evt-handler
//   isActive: boolean; schedule @active
export const useWindowAddEvents = (e, run, isActive$ = true) => {
  const w$ = useWindow();
  const cleanup = () => w$ && w$.removeEventListener(e, run);
  //
  useEffect(() => {
    isActive$ && w$ && w$.addEventListener(e, run);
    //
    return cleanup;
  }, [w$, isActive$]);
  //
  return cleanup;
};

//
export const WindowDocumentContext = createContext();
export const useWindowDocument = () => useContext(WindowDocumentContext);

export const WindowDocumentProvider = ({ children }) => {
  const isMounted = useIsMounted();
  const w$ = useWindow();
  const jQuery = useJQuery();
  const [doc$, setDoc] = useState(null);
  const [isReady, setIsReady] = useState(null);

  useEffect(() => {
    if (w$ && w$?.document) {
      setDoc(w$.document);
      ready(w$, w$.document)(() => setIsReady(true));
    }
  }, [w$, w$?.document]);

  const g = {
    isMounted,
    isReady,
    document: doc$,
    window: w$,
    jQuery,
  };

  return (
    <WindowDocumentContext.Provider value={g}>
      {children}
    </WindowDocumentContext.Provider>
  );
};

export const useWindowResizeEvent = (callback, isActive$ = true) => {
  const { jQuery: $, window } = useWindowDocument();
  const callback_ = debounce(callback, 155);
  useEffect(() => {
    isActive$ && window && $ && $(window).on("resize", callback_);
    return () => $ && $(window).off("resize", callback_);
  }, [isActive$, $, window]);
};
