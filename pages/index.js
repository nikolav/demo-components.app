/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Drag, Link, FloatingPanel } from "../components";
import { Button, Container } from "../components/mui";
import { useMemo, useCallback, useState, useRef, useEffect } from "react";
// @todo.slider
//   https://codesandbox.io/s/bold-hill-stmnwk?file=/src/App.js
//
// import {
//   ProgressBar,
//   ProgressBarVertical,
//   Slider,
//   ProgressRing,
//   Modal,
//   DarkModeToggle,
//   Drag,
// } from "../components";
import { useStateSwitch } from "../src/hooks";
// import { random } from "../src/util";
//
// https://next-auth.js.org/getting-started/example#frontend---add-react-hook
export default function Index() {
  const { isActive, toggle } = useStateSwitch(true);
  return (
    <Container
      css={css`
        background-color: steelblue;
      `}
    >
      {/* <Drag className="***w-fit fixed">
        <div
          className="border-2 border-slate-600 shadow-md rounded-xl bg-gradient-to-b from-slate-500 to-slate-600"
          css={css`
            width: 256px;
            color: white;
            text-transform: uppercase;
            font-weight: 700;
            overflow: hidden;
          `}
        >
          <Drag.Handle
            css={css`
              padding: 0.5rem;
            `}
            className="bg-slate-800 text-right text-white cursor-grab"
          >
            <h2>DRAG</h2>
          </Drag.Handle>
          <div
            css={css`
              padding: 1rem;
            `}
          >
            <p>app.start</p>
          </div>
        </div>
      </Drag> */}
      <FloatingPanel
        header={
          <em
            css={css`
              opacity: 0.56;
              fontsize: 87%;
              fontstyle: italic;
            `}
          >
            floating.panel@nikolav.rs
          </em>
        }
        className="w-96 right-24"
      >
          <p>Lorem ad porro dolorum ipsum provident?</p>
          <p>Lorem ad porro dolorum ipsum provident?</p>
          <p>Lorem ad porro dolorum ipsum provident?</p>
      </FloatingPanel>
      <Button onClick={toggle}>run</Button>
    </Container>
  );
}
