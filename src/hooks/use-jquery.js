import { createContext, useContext, useState, useEffect } from "react";
import factoryJQuery from "../jquery/factory";
import { useWindow } from "./use-window";
//


export const useJQuery = () => {
  const w$ = useWindow();
  const [jq, setJQ] = useState({jQuery: null});
  // 
  useEffect(() => {
    w$ && setJQ({jQuery: factoryJQuery(w$) });
  }, [w$]);
  //
  return jq.jQuery;
};
