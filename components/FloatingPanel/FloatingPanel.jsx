/** @jsxImportSource @emotion/react */
import { useEffect, useState, forwardRef } from "react";
import { css } from "@emotion/react";
import { useStateSwitch } from "../../src/hooks";
import Details from "../Details/Details";
import PortalOverlays from "../PortalOverlays";
import { motion, useDragControls } from "framer-motion";
import { classnames as cls } from "../../src/util";
//
const styleRoot = css`
  position: fixed !important;
  zindex: 1;
`;
const styleToolbar = css`
  position: absolute;
  top: -24px;
  left: 0;
  width: 100%;
`;
const styleToolbarClosed = css``;
const styleDragHandle = css`
  cursor: grab;
  display: inline-block;
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
    transition: { type: "spring", duration: 0.24},
  },
  min: {
    y: "calc(100vh - 48px)",
    transition: { ease: "easeOut", duration: 0.12 },
  },
};
////
////
const FloatingPanel = forwardRef(function FloatingPanel_(
  { classDrag = "dragging", className = "", children, ...rest },
  ref
) {
  //
  const [goto$, goto] = useState();
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
    <PortalOverlays>
      <motion.div
        ref={ref}
        css={styleRoot}
        className={cls(className, {
          [styleIsDrag]: isDrag$,
          [classDrag]: isDrag$,
        })}
        /* */
        initial={false}
        animate={goto$}
        variants={variants}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        /* */
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
          {/* icon drag handle */}
          {!isMinimied$ && (
            <strong css={styleDragHandle} onPointerDown={dragStart}>
              @drag
            </strong>
          )}
          {/* icons right */}
          <div className="space-x-2">
            {!isMinimied$ && <strong onClick={toggleIsOpen}>@close</strong>}
            <strong onClick={toggleIsMinimized}>@mM</strong>
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
    </PortalOverlays>
  );
});
export default FloatingPanel;
