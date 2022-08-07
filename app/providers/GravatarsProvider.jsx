import { useState, useEffect, createContext, useContext } from "react";
import { firebase } from "../services";
import { ref, onValue } from "firebase/database";
// import { dbRealtime as db } from "../../firebase";

const { dbRealtime: db } = firebase;
//
export const GravatarsContext = createContext();
export const useGravatars = () => useContext(GravatarsContext);
//
export default function GravatarsProvider({ children }) {
  const [gravatarsDB, setGravatarsDB] = useState({});
  const refG = ref(db, "gravatar");
  //
  useEffect(
    () =>
      onValue(refG, (res) => {
        setGravatarsDB((current) => res.val() || current);
      }),
    []
  );
  //
  return (
    <GravatarsContext.Provider value={gravatarsDB}>
      {children}
    </GravatarsContext.Provider>
  );
}
