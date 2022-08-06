import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import qs from "qs";
import { omit, pick, stripEndSlashes } from "../util";
import {
  AUTH_API_URL,
  AUTH_API_URL_users,
  AUTH_SESSION_TOKEN,
} from "../../app/store";
import { useWindowDocument } from "./use-window";
//
const ACCESS_TOKEN = "accessToken";
const AUTH_CONFIG = { strategy: "local" };
const AUTH_ERROR = "authError";
const reIdAndToken = /^(.*?)\.\.(.*)$/;
//
// access token from auth-api response
const accessTokenFromResponse = (data) => data[ACCESS_TOKEN];
//
// verify auth-data shape is valid; no nulls and errors
const isValidAuth = (authData) => !!authData && 0 === authData[AUTH_ERROR];
const isValidAuthAndToken = (authData) =>
  isValidAuth(authData) && null != accessTokenFromResponse(authData);
//
// read auth-data from api response
// .. parse raw api response to valid shape
const authDataFromResponse = (data) =>
  ((authData) =>
    Object.keys(authData).reduce(
      (coll, key) => ({
        ...coll,
        ...Object(authData[key]),
      }),
      {}
    ))(omit(data || {}, ["accessToken", "authentication"]));
const authDataFromResponse_authenticate = (data) => ({
  ...authDataFromResponse(data),
  [ACCESS_TOKEN]: accessTokenFromResponse(data),
});
const authDataFromResponse_register = (data) => ({ ...data });
const authDataFromResponse_session = (data) => ({ ...data });
//
const AuthApiContext = createContext();
//
// auth interface
export const useAuthApi = () => useContext(AuthApiContext);
//
// -- api.endpoints x2; @auth, @users
//   POST ${AUTH_API_URL}        # auth, token
//   POST ${AUTH_API_URL_users}  # +user
//   GET  ${AUTH_API_URL_users}  # fetch-user
export const AuthApiProvider = ({ children }) => {
  const { isMounted } = useWindowDocument();
  const [authSession, setAuthSession] = useState({
    //
    // auth flags
    error: null,
    processing: null,
    //
    // auth session
    token: null,
    user: null,
  });
  const authSessionApi = {
    authenticate: authenticate_,
    login: login_,
    logout: logout_,
    register: register_,
  };
  const authSessionValue = {
    ...authSession,
    ...authSessionApi,
  };
  //
  // manage auth state
  const authStatusError = (error) => setAuthSession((s) => ({ ...s, error }));
  const authStatusProcessingOff = () =>
    setAuthSession((s) => ({ ...s, processing: false }));
  const setAuth = (user) => setAuthSession((sess) => ({ ...sess, user }));
  const setAuthToken = (token) => setAuthSession((s) => ({ ...s, token }));
  //
  // cache session creds to enable auto login @mount
  useEffect(() => {
    try {
      if (authSession.user._id && authSession.token)
        localStorage.setItem(
          AUTH_SESSION_TOKEN,
          `${authSession.user._id}..${authSession.token}`
        );
    } catch {}
  }, [authSession?.user?._id, authSession?.token]);
  //
  // auto login @mount from localStorage
  useEffect(() => {
    isMounted && loadSession_();
  }, [isMounted]);
  //
  //
  return (
    <AuthApiContext.Provider value={authSessionValue}>
      {children}
    </AuthApiContext.Provider>
  );
  //
  // -- api.accessToken
  //   creds:
  //     email:     string.unique.required;
  //     password:  string.required;
  async function authenticate_(creds) {
    authStatusBegin();
    let authData = null;
    try {
      const { data } = await axios({
        method: "post",
        url: AUTH_API_URL,
        data: qs.stringify({ ...AUTH_CONFIG, ...creds }),
      });
      authData = authDataFromResponse_authenticate(data);
      if (!isValidAuthAndToken(authData)) throw "bad credentials";
      //
      setAuthToken(accessTokenFromResponse(data));
    } catch (error) {
      authStatusError(error);
    } finally {
      authStatusProcessingOff();
    }
    //
    return authData;
  }
  //
  // -- user.find
  // creds:
  //   email:     string.unique.required;
  //   password:  string.required;
  async function login_(creds) {
    const authData = await authenticate_(creds);
    if (authData) setAuth(omit(authData, [ACCESS_TOKEN]));
  }
  //
  // -- user.create
  //   creds:
  //     name:      string.required;
  //     email:     string.unique.required;
  //     password:  string.required;
  async function register_(creds) {
    authStatusBegin();
    try {
      const { data: authData } = await axios({
        method: "post",
        url: AUTH_API_URL_users,
        data: qs.stringify({ ...creds }),
      });
      authData = authDataFromResponse_register(authData);
      if (!isValidAuth(authData)) throw "bad request";
      //
      await authenticate_(pick(creds, ["email", "password"]));
      //
      setAuth(authData);
    } catch (error) {
      authStatusError(error);
    } finally {
      authStatusProcessingOff();
    }
  }
  //
  // creds @localStorage
  //   id:    string.id;
  //   token: <jwt-token>;
  async function loadSession_() {
    authStatusBegin();
    //
    try {
      const { id, token } = ((m) => ({
        id: m[1],
        token: m[2],
      }))(reIdAndToken.exec(localStorage.getItem(AUTH_SESSION_TOKEN)));
      //
      if (id && token) {
        const { data: authData } = await axios({
          method: "get",
          url: `${stripEndSlashes(AUTH_API_URL_users)}/${encodeURI(id)}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //
        authData = authDataFromResponse_session(authData);
        if (isValidAuth(authData)) {
          setAuthToken(token);
          setAuth(authData);
        }
      }
      //
    } catch {
      // ignore
    } finally {
      authStatusProcessingOff();
    }
  }
  //
  // clear session
  async function logout_() {
    localStorage.removeItem(AUTH_SESSION_TOKEN);
    setAuthSession((sess) => ({
      ...sess,
      token: null,
      user: null,
      error: null,
      processing: false,
    }));
  }
  //
  // reset auth-status before hiting api
  function authStatusBegin() {
    setAuthSession((sess) => ({
      ...sess,
      token: null,
      error: null,
      processing: true,
    }));
  }
  //
};
