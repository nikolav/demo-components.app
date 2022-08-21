import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { assign } from "../../src/util";

//
export const DEMO = "lbdrdkryztu";
const initialState = {
  [DEMO]: "0.0.0",
};

export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    setDemo: (state, action) => {
      state[DEMO] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDemo } = demoSlice.actions;

export default demoSlice.reducer;

//
// export redux store shortcut
export function useDemo() {
  //
  const demo = useSelector((state) => state.demo);
  const dispatch = useDispatch();
  //
  const client = assign((name) => demo[name], {
    setDemo: (version) => dispatch(setDemo(version)),
  });
  //
  return client;
}
