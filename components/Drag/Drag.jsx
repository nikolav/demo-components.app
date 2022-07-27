/** @jsxImportSource @emotion/react */
import { createContext, useContext, forwardRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { useStateSwitch } from "../../src/hooks";
import modcss from "./Drag.module.css";
import { css } from "@emotion/react";

const DragContext = createContext();
//
const Drag = forwardRef(function Drag_(
  { classDrag = "drag", children, ...rest },
  ref
) {
  const { isActive: isDrag$, toggle: toggleIsDrag } = useStateSwitch();
  const dragControls = useDragControls();

  return (
    <DragContext.Provider value={{ dragControls }}>
      <motion.div
        ref={ref}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        //
        className={`${modcss.drag} ${
          isDrag$ ? `${modcss.dragIsDragging} ${classDrag}` : ""
        }`}
        onDragStart={toggleIsDrag.on}
        onDragEnd={toggleIsDrag.off}
        // dragConstraints={null}
        {...rest}
      >
        {children}
      </motion.div>
    </DragContext.Provider>
  );
});

const DragHandle = ({ children, className, ...rest }) => {
  const { dragControls } = useContext(DragContext);

  return (
    <div
      css={css`
        cursor: grab;
      `}
      onPointerDown={(e) => dragControls.start(e)}
      {...rest}
    >
      {children}
    </div>
  );
};

Drag.Handle = DragHandle;
//

export default Drag;

// whileDrag: VariantLabels | TargetAndTransition
// drag: boolean | "x" | "y"
// dragConstraints: false | Partial<BoundingBox2D> | RefObject<Element>
// dragControls: DragControls
// dragElastic: DragElastic 0 | 1
// dragListener: boolean
// dragMomentum: boolean
// dragPropagation: boolean
// dragSnapToOrigin: boolean
// dragTransition: InertiaOptions
//
// onDrag(event, info): void
// onDragStart(event, info): void
// onDragEnd(event, info): void
// onDirectionLock(axis): void
//
