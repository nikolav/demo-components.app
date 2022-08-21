import { useAppData, ADMIN, TEST, TEMP_FILE, USERNAME, QUIZ } from "./slice-appdata";
import {
  useFlags,
  FLAG_TEST,
  FLAG_BLOKUI,
  FLAG_APP_IS_PROCESSING,
} from "./slice-flags";
import { useResourceMain } from "../resource";
//
import { useColorMode } from "../providers/muiThemeProvider";
import { useAuth, AUTH, AUTH_ERROR, AUTH_PROCESSING } from "./slice-auth";
//
import { useAuthApi } from "../../src/hooks/use-auth-api";
//
import { useColorModeTW, MODE_LIGHT, MODE_DARK } from "./slice-color-mode-tw";
//
const API_URL_dev = "http://localhost:3344/";
const API_URL_production = "https://jeytgwpjlmm.herokuapp.com/";
const REST_RESOURCE_main = "main";
const REST_RESOURCE_messages = "messages";
//
const AUTH_API_URL = "http://localhost:3344/authentication";
const AUTH_API_URL_users = "http://localhost:3344/users";
const AUTH_SESSION_TOKEN = "vwubgzjskpp";
//
const API_URL = API_URL_dev;
// const API_URL = API_URL_production;
//
export {
  API_URL,
  API_URL_dev,
  API_URL_production,
  //
  AUTH_API_URL,
  AUTH_API_URL_users,
  AUTH_SESSION_TOKEN,
  //
  REST_RESOURCE_main,
  REST_RESOURCE_messages,
  //
  useAppData,
  ADMIN,
  TEST,
  TEMP_FILE,
  USERNAME,
  QUIZ,
  useFlags,
  FLAG_BLOKUI,
  FLAG_TEST,
  FLAG_APP_IS_PROCESSING,
  useAuth,
  AUTH,
  AUTH_ERROR,
  AUTH_PROCESSING,
  useAuthApi,
  useColorModeTW,
  MODE_LIGHT,
  MODE_DARK,
  //
  useResourceMain,
  useColorMode,
};
