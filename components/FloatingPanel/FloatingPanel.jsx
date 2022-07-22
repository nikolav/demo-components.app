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
/* @t */
const styleToolbar = css`
  position: absolute;
  top: -43px;
  width: 100%;
  background: none;
  padding-top: 4px;
  color: steelblue;
  > header {
    text-align: left;
  }
`;
const styleToolbarClosed = css``;
const styleToolbarMinimized = css`
  background: #b8cfe2;
`;
const styleDragHandle = css`
  cursor: grab;
  display: inline-block;
  font-size: 32px;
  color: steelblue;
  transform: translate(-15px, 0px);
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
  &:hover {
    transform: scale(1.034);
  }
`;
const styleContent = css`

`;
const styleIsDrag = css`
  & * {
    user-select: none;
  }
`;
//
const variants = {
  max: {
    y: 0,
    transition: { type: "spring", duration: 0.2 },
    opacity: 1,
    scale: 1,
  },
  min: (offsetTop) => ({
    y: `calc(100vh - ${offsetTop}px)`,
    transition: { type: "spring", duration: 0.18 },
    opacityy: 0.82,
    scale: 0.78,
  }),
};
////
////
const FloatingPanel = forwardRef(function FloatingPanel_(
  {
    /* render toolbar header content btw. icons; */
    header = "floating.panel@nikolav.rs",
    /* add margin above FloatingPanel */
    offsetTop = 156,
    /* add classes when draging gesture is active */
    classDrag = "dragging",
    /* arbitrary classes to apply to root */
    className = "",
    /* content */
    children,
    /* rest root attributes */
    ...rest
  },
  ref
) {
  //
  const [goto$, goto] = useState("max");
  const { isActive: isOpen$, toggle: toggleIsOpen } = useStateSwitch(true);
  const { isActive: isMinimized$, toggle: toggleIsMinimized } =
    useStateSwitch();
  const { isActive: isDrag$, toggle: toggleIsDrag } = useStateSwitch();
  //
  const dragControls = useDragControls();
  const dragStart = (e) => dragControls.start(e);
  //
  useEffect(() => {
    if (isMinimized$) {
      toggleIsOpen.off();
      goto("min");
      return;
    }
    //
    toggleIsOpen.on();
    goto("max");
  }, [isMinimized$]);
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
      {/* @t */}
      {/* toolbar */}
      <div
        css={styleToolbar}
        className={cls("flex items-center duration-100 transition-colors", {
          ["justify-between"]: !isMinimized$,
          ["justify-end"]: isMinimized$,
          [styleToolbarMinimized]: isMinimized$,
          [styleToolbarClosed]: !isOpen$,
        })}
      >
        {/*  */}
        {/* drag handle */}
        {!isMinimized$ && (
          <MdDragIndicator css={styleDragHandle} onPointerDown={dragStart} />
        )}
        {header && <header>{header}</header>}
        {/* controlls right */}
        <span css={css`
          display: inline-block;
          transform: translate(6px, -2px);
        `} className="space-x-2 flex items-center">
          {!isMinimized$ && (
            <IconCrossfade
              i0={{
                key: "i0",
                icon: <BsChevronContract css={styleControlls} />,
              }}
              i1={{
                key: "i1",
                icon: <BsChevronExpand css={styleControlls} />,
              }}
              css={css`
                display: inline-block;
                transform: scale(.94) translate(8px, 0px);
              `}
              onClick={toggleIsOpen}
              duration={122}
            />
          )}
          <IconCrossfade
            i0={{
              key: "min",
              icon: <MdMinimize css={[styleControlls, styleControllsMM]} />,
            }}
            i1={{
              key: "max",
              icon: (
                <VscChromeMaximize css={[styleControlls, styleControllsMM]} />
              ),
            }}
            css={css`
              display: inline-block;
              transform: translate(-5px, -4px);
              transform-origin: center;
            `}
            onClick={toggleIsMinimized}
            duration={122}
          />
        </span>
      </div>
      {/*  */}
      {/* content */}
      <Details
        css={styleContent}
        header={null}
        isActive={isOpen$}
        durationIn={0.1}
        durationOut={0.1}
        spring={false}
      >
        {children}
      </Details>
      {/*  */}
    </motion.div>
  );
});
export default FloatingPanel;

// 4682B3
//  @steelblue
