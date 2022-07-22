/** @jsxImportSource @emotion/react */
import { useEffect, useState, forwardRef } from "react";
import { css } from "@emotion/react";
import { useStateSwitch } from "../../src/hooks";
import Details from "../Details/Details";
import IconCrossfade from "../IconCrossfade/IconCrossfade";
import { motion, useDragControls } from "framer-motion";
import { classnames as cls } from "../../src/util";
import {
  MdMinimize,
  VscChromeMaximize,
  MdDragIndicator,
  BsChevronContract,
  BsChevronExpand,
} from "../icons";
//
const styleRoot = css`
  position: fixed !important;
  zindex: 1;
`;
const styleToolbar = css`
  position: absolute;
  top: -36px;
  left: 0;
  width: 100%;
`;
const styleToolbarClosed = css``;
const styleDragHandle = css`
  cursor: grab;
  display: inline-block;
  font-size: 32px;
  color: steelblue;
  transition: transform 0.11s linear;
  &:hover {
    transform: scale(1.11);
  }
`;
const styleControlls = css`
  cursor: pointer;
  display: inline-block;
  font-size: 32px;
  color: steelblue;
  transition: transform 0.11s linear;
  &:hover {
    transform: scale(1.11);
  }
`;
const styleControllsMM = css`
  font-size: 40px;
`;
const styleContent = css``;
const styleIsDrag = css`
  & * {
    user-select: none;
  }
`;
//
const variants = {
  max: {
    y: 0,
    transition: { type: "spring", duration: 0.24 },
    opacity: 1,
    scale: 1,
  },
  min: (offsetTop) => ({
    y: `calc(100vh - ${offsetTop}px)`,
    transition: { ease: "easeOut", duration: 0.12 },
    opacityy: 0.88,
    scale: 0.88,
  }),
};
////
////
const FloatingPanel = forwardRef(function FloatingPanel_(
  {
    offsetTop = 156,
    classDrag = "dragging",
    className = "",
    children,
    ...rest
  },
  ref
) {
  //
  const [goto$, goto] = useState("max");
  const { isActive: isOpen$, toggle: toggleIsOpen } = useStateSwitch(true);
  const { isActive: isMinimied$, toggle: toggleIsMinimized } = useStateSwitch();
  const { isActive: isDrag$, toggle: toggleIsDrag } = useStateSwitch();
  //
  const dragControls = useDragControls();
  const dragStart = (e) => dragControls.start(e);
  //
  useEffect(() => {
    if (isMinimied$) {
      toggleIsOpen.off();
      goto("min");
      return;
    }
    //
    toggleIsOpen.on();
    goto("max");
  }, [isMinimied$]);
  //
  return (
    <motion.div
      key="FloatingPanel.jkuajcqwawf"
      ref={ref}
      css={styleRoot}
      className={cls(className, {
        [styleIsDrag]: isDrag$,
        [classDrag]: isDrag$,
      })}
      style={{
        top: offsetTop,
      }}
      /* */
      initial={"in"}
      animate={goto$}
      exit={"out"}
      variants={variants}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      /* */
      custom={offsetTop}
      onDragStart={toggleIsDrag.on}
      onDragEnd={toggleIsDrag.off}
      {...rest}
    >
      {/*  */}
      {/* toolbar */}
      <div
        css={styleToolbar}
        className={cls("flex items-center duration-100 transition-colors", {
          ["justify-between"]: !isMinimied$,
          ["justify-end"]: isMinimied$,
          [styleToolbarClosed]: !isOpen$,
        })}
      >
        {/*  */}
        {/* drag handle */}
        {!isMinimied$ && (
          <MdDragIndicator css={styleDragHandle} onPointerDown={dragStart} />
        )}
        {/* controlls right */}
        <div className="space-x-2">
          {!isMinimied$ && (
            <IconCrossfade
              i0={{
                key: "i0",
                icon: <BsChevronContract css={styleControlls} />,
              }}
              i1={{
                key: "i1",
                icon: <BsChevronExpand css={styleControlls} />,
              }}
              onClick={toggleIsOpen}
            />
          )}
          <IconCrossfade
            i0={{
              key: "min",
              icon: <MdMinimize css={[styleControlls, styleControllsMM]} />,
            }}
            i1={{
              key: "max",
              icon: <VscChromeMaximize css={[styleControlls, styleControllsMM]} />,
            }}
            css={css`
              display: inline-block;
              transform: translate(-1px, -6px);
              transform-origin: center top;
            `}
            onClick={toggleIsMinimized}
            duration={122}
          />
        </div>
      </div>
      {/*  */}
      {/* content */}
      <Details
        css={styleContent}
        header={null}
        isActive={isOpen$}
        durationIn={0.15}
        durationOut={0.12}
        spring={false}
      >
        {children}
      </Details>
      {/*  */}
    </motion.div>
  );
});
export default FloatingPanel;
