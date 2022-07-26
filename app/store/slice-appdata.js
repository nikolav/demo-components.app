import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { paste, has, nanoid } from "../../src/util";

//
export const TEST = "fktzzfpmzpb";
export const ADMIN = "otqknvlgpve";
export const TEMP_FILE = "mngbaguzkgn"
//
const initialState = {
  [ADMIN]: {
    name: "nikolav",
    email: "admin@nikolav.rs",
    url: "https://nikolav.rs/",
    github: "https://github.com/nikolav",
  },
  [TEST]: "1.22.333",
  [TEMP_FILE]: null,
};

export const appdataSlice = createSlice({
  name: "appdata",
  initialState,
  reducers: {
    setAppData: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state[action.payload.name] = action.payload.value;
    },
    removeAppData: (state, action) => {
      delete state[action.payload];
    },
    clearAppDataEntry: (state, action) => {
      state[action.payload.name] = action.payload.EMPTY;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAppData, removeAppData, clearAppDataEntry } = appdataSlice.actions;

export default appdataSlice.reducer;

//
// export redux store shortcut
export function useAppData() {
  //
  const appdata = useSelector((state) => state.appdata);
  const dispatch = useDispatch();
  //
  const handle = paste((name) => appdata[name], {
    debug: () => JSON.stringify(appdata, null, 2),
    //
    id: nanoid,
    //
    clear: (name, EMPTY = null) => dispatch(clearAppDataEntry({ name, EMPTY })),
    has: (name) => has(appdata, name),
    ls: () => Object.keys(appdata),
    rm: (name) => dispatch(removeAppData(name)),
    set: (name, value) => dispatch(setAppData({ name, value })),
    // 
  });
  //
  return handle;
}
