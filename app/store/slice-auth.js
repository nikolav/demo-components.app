import { useEffect } from "react";
import { supabase as client } from "../services"
// import { supabase as client } from "../../supabase";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { omit } from "../../src/util";
import { useAuthSession } from "../providers/AuthSessionProvider";
//
export const AUTH = "dulhvpewrxd";
export const AUTH_ERROR = "jmfcmsbvhwy";
export const AUTH_PROCESSING = "ovughjskbex";
//
const initialState = {
  [AUTH]: null,
  [AUTH_ERROR]: null,
  [AUTH_PROCESSING]: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const user = action.payload;
      state[AUTH] = {
        ...user.user_metadata,
        uid: user.id,
        email: user.email,
        "_@": user.created_at,
      };
    },
    setAuthError: (state, action) => {
      state[AUTH_ERROR] = action.payload;
    },
    setAuthProcessingOn: (state, _action) => {
      state[AUTH_PROCESSING] = true;
    },
    setAuthProcessingOff: (state, _action) => {
      state[AUTH_PROCESSING] = false;
    },
    destroyAuth: (state, _action) => {
      state[AUTH] = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuth,
  setAuthError,
  setAuthProcessingOn,
  setAuthProcessingOff,
  destroyAuth,
} = authSlice.actions;

export default authSlice.reducer;

//
// export redux store shortcut
export function useAuth() {
  const session = useAuthSession();
  //
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //
  const authError = (error) => dispatch(setAuthError(error));
  const authNoError = () => authError(null);
  const authProcessingOn = () => dispatch(setAuthProcessingOn());
  const authProcessingOff = () => dispatch(setAuthProcessingOff());
  const authStatusRestart = () => {
    authNoError();
    authProcessingOn();
  };
  //
  useEffect(() => {
    if (!session?.user) {
      dispatch(destroyAuth());
      return;
    }
    dispatch(setAuth(session.user));
  }, [session?.user]);
  //
  return {
    error: auth[AUTH_ERROR],
    processing: auth[AUTH_PROCESSING],
    //
    auth: auth[AUTH],
    session,
    //
    login: async (creds) => {
      authStatusRestart();
      try {
        const { error } = await client.auth.signIn(creds);
        if (error) authError(error);
      } catch (error) {
        authError(error);
      } finally {
        authProcessingOff();
      }
    },
    //
    register: async (creds) => {
      authStatusRestart();
      try {
        const { error } = await client.auth.signUp(
          {
            email: creds.email,
            password: creds.password,
          },
          {
            data: {
              ...omit(creds, ["email", "password"]),
            },
          }
        );
        if (error) authError(error);
      } catch (error) {
        authError(error);
      } finally {
        authProcessingOff();
      }
    },
    //
    logout: async () => {
      authStatusRestart();
      try {
        const { error } = await client.auth.signOut();
        if (error) authError(error);
      } catch (error) {
        authError(error);
      } finally {
        authProcessingOff();
      }
    },
  };
}
