import { createContext, useContext, useEffect, useState } from "react";
import { supabase as client } from "../../supabase";
import { useWindowDocument } from "../../src/hooks";

export const AuthSessionContext = createContext();
export const useAuthSession = () => useContext(AuthSessionContext);

export default function AuthSessionProvider({ children }) {
  const { isMounted } = useWindowDocument();
  const [session, setSession] = useState(null);
  //
  useEffect(() => {
    let session_;
    if (isMounted) {
      //
      client.auth.onAuthStateChange((eType, session) => {
        if ("SIGNED_OUT" == eType) return setSession(null);
        if ("SIGNED_IN" == eType) return setSession(session);
      });
      //
      session_ = client.auth.session();
      if (session_) {
        setSession(session_);
      }
    }
  }, [isMounted]);
  return (
    <AuthSessionContext.Provider value={session}>
      {children}
    </AuthSessionContext.Provider>
  );
}
