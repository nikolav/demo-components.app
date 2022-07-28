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
const styleWidget = css`
  position: fixed !important;
  z-index: 1;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;
const styleWidgetRoot = css`
  background: white;
  /* padding: 2rem; */
`;
//
const styleWidgetClosed = css``;
/* @t */
const styleToolbar = css`
  position: absolute;
  top: -43px;
  width: 100%;
  background: none;
  padding-top: 3px;
  color: steelblue;
  /* left: 50%;
  transform: translate(-48%, 0);   */
  padding-left: 16px;
  padding-right: 4px;
`;
const styleToolbarClosed = css`
  /* width: 100%; */
  /* background: white; */
  /* background: #4682B3; */
  /* color: white; */
  border-radius: 2px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;
const styleToolbarMinimized = css`
  background: rgb(184 207 226 / 53%);
  header {
    padding-left: 20px;
  }
`;
const styleDragHandle = css`
  cursor: grab;
  display: inline-block;
  font-size: 32px;
  /* color: steelblue; */
  transform: translate(-13px, 0px);
`;
const styleControlls = css`
  cursor: pointer;
  display: inline-block;
  font-size: 32px;
  /* color: steelblue; */
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
const styleContent = css``;
const styleIsDrag = css`
  & * {
    user-select: none;
  }
`;
const styleHeader = css`
  flex-grow: 1;
  padding-bottom: 2px;
  display: inline-block;
`;
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
    /* render toolbar title content btw. icons; */
    title = "floating.panel@nikolav.rs",
    /* add margin above FloatingPanel */
    offsetTop = 156,
    /*  */
    width = 472,
    /* add classes when draging gesture is active */
    classDrag = "dragging",
    /* apply classes to content parent node */
    className = "",
    /*  */
    /* @todo */
    /* isDark = null, */
    /*  */
    /*  */
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
      css={[
        styleWidget,
        isDrag$ && styleIsDrag,
        isDrag$ && classDrag,
        !isOpen$ && styleWidgetClosed,
      ]}
      /* className={className} */
      style={{
        top: offsetTop,
        width,
        left: "6%"
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
        css={[
          styleToolbar,
          isMinimized$ && styleToolbarMinimized,
          !isOpen$ && styleToolbarClosed,
        ]}
        className={cls(
          "dark:text-white flex items-center duration-100 transition-colors",
          {
            ["justify-between"]: !isMinimized$,
            ["justify-end dark:bg-black"]: isMinimized$,
            ["text-white bg-primary dark:bg-slate-800"]:
              !isOpen$ && !isMinimized$,
          }
        )}
      >
        {/*  */}
        {/* drag handle */}
        {!isMinimized$ && (
          <strong
            css={css`
              transform: translate(-12px, 0px);
              padding-left: 6px;
            `}
          >
            <MdDragIndicator
              className="dark:text-white"
              css={css([styleDragHandle])}
              onPointerDown={dragStart}
            />
          </strong>
        )}
        {title && <header css={styleHeader}>{title}</header>}
        {/* controlls right */}
        <span
          css={css`
            display: inline-block;
            transform: translate(6px, -2px);
            // transform: translate(6px, 3px);
          `}
          className="space-x-2 flex items-center"
        >
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
                transform: scale(0.94) translate(8px, 0px);
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
              transform: translate(-5px, -3px);
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
        <div className={`dark:bg-slate-800 ${className}`} css={styleWidgetRoot}>{children}</div>
      </Details>
      {/*  */}
    </motion.div>
  );
});
export default FloatingPanel;

// 4682B3
//  @steelblue
