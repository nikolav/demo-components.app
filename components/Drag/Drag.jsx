import React, { createContext, useContext, forwardRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { useStateSwitch } from "../../src/hooks";
import modcss from "./Drag.module.css";

const DragContext = createContext();
//
const Drag = forwardRef(function Drag_(
  { classDrag = "drag", className = "", children, ...rest },
  ref
) {
  const { isActive: isDrag$, toggle: toggleIsDrag } = useStateSwitch();
  const dragControls = useDragControls();
  return (
    <DragContext.Provider value={{ dragControls }}>
      <motion.div
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
        ref={ref}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        className={`${modcss.drag} ${className} ${
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

const DragHandle = ({ children, ...rest }) => {
  const { dragControls } = useContext(DragContext);

  return (
    <div onPointerDown={(e) => dragControls.start(e)} {...rest}>
      {children}
    </div>
  );
};

Drag.Handle = DragHandle;
//

export default Drag;
