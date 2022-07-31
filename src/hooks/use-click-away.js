import { useEffect } from "react";
import { useWindowDocument } from "./use-window";
//
const useClickAway = (
  // ref
  root,
  // callback
  handle,
  // wait dom
  isActive$ = true
) => {
  const { document } = useWindowDocument();
  const html = document?.documentElement;
  //
  const handle_ = (evt) =>
    root?.current && !root.current.contains(evt.target) && handle(evt);
  //
  const cleanup = () => html?.removeEventListener("click", handle_);
  //
  useEffect(() => {
    isActive$ && html?.addEventListener("click", handle_);
    return cleanup;
  }, [html, isActive$]);
  //
  return cleanup;
};

export default useClickAway;
