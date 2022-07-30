import { useState, useEffect } from "react";
import factoryJQuery from "../jquery/factory";
import { useWindow } from "./use-window";
//


export const useJQuery = () => {
  const w$ = useWindow();
  const [jq$, setjq] = useState({jQuery: null});
  // 
  useEffect(() => {
    w$ && setjq({jQuery: factoryJQuery(w$) });
  }, [w$]);
  //
  return jq$.jQuery;
};
