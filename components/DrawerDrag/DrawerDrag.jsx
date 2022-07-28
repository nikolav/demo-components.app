import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortalOverlays from "../PortalOverlays";
import {
  RiCloseCircleFill,
  FaWindowMinimize,
  FaRegWindowMaximize,
} from "../icons";
import { noop } from "../../src/util";

//
const variantsDrawerWindow = {
  minimize: { opacity: 0.82, y: "82vh" },
  maximize: { opacity: 1, y: 0 },
  out: { opacity: 0, y: "102%" },
};
//
export default function DrawerDrag({
  // open/close
  isActive,
  // run @unmount
  onClose = noop,
  // display minize/maximize/close controlls
  controlls = true,
  // offset from top in [px]
  offsetTop = 52,
  // drag distance in [px] to 
  //  minimize/maximize the panel
  offsetToggle = 256,
  // panel styles
  className = "",
  // content
  children,
}) {
  //
  const [drawerMode, setDrawerModeMode] = useState("maximize");
  const isMinimized = () => "minimize" === drawerMode;
  const minimizeDrawer = () => setDrawerModeMode("minimize");
  const maximizeDrawer = () => setDrawerModeMode("maximize");
  //
  useEffect(() => {
    isActive && maximizeDrawer();
  }, [isActive]);
  //
  return (
    <AnimatePresence>
      {isActive ? (
        <PortalOverlays>
          {/*  */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            style={{
              top: offsetTop,
              pointerEvents: isMinimized() ? "none" : "all",
            }}
            onDragEnd={(_evt, { offset: { y } }) => {
              if (offsetToggle < y) {
                minimizeDrawer();
                return;
              }
              if (y < -offsetToggle) maximizeDrawer();
            }}
            className={`w-full sm:mx-[4px] sm:w-auto fixed z-[1] inset-x-0 rounded-t-3xl ${className}`}
          >
            <motion.div
              variants={variantsDrawerWindow}
              initial="out"
              exit="out"
              animate={drawerMode}
              style={{
                pointerEvents: "all",
              }}
            >
              <div
                className="bg-white dark:bg-black cursor-grab pt-6 px-6 rounded-t-3xl relative border-4 border-primary dark:border-slate-800"
                style={{
                  paddingBottom: 122,
                  minHeight: "calc(100vh + 122px)",
                  boxShadow: "rgb(0 0 0 / 24%) 0px 3px 12px",
                }}
              >
                {controlls && (
                  <>
                    {"maximize" === drawerMode ? (
                      <FaWindowMinimize
                        onClick={minimizeDrawer}
                        style={{ fontSize: 28, transformOrigin: "bottom" }}
                        className="text-slate-800 dark:text-white opacity-90 hover:opacity-100 hover:scale-125 cursor-pointer absolute top-0 right-16 -translate-y-[130%] transition-transform"
                      />
                    ) : (
                      <FaRegWindowMaximize
                        onClick={maximizeDrawer}
                        style={{ fontSize: 28 }}
                        className="text-primary dark:text-white opacity-90 hover:opacity-100 hover:scale-110 cursor-pointer absolute top-0 right-16 -translate-y-[120%] transition-transform"
                      />
                    )}
                    <RiCloseCircleFill
                      onClick={onClose}
                      style={{ fontSize: 33 }}
                      className={`dark:text-white opacity-90 hover:opacity-100 hover:scale-125 hover:text-red-600 dark:hover:text-red-400 cursor-pointer absolute top-0 right-4 -translate-y-[118%] transition-transform ${"maximize" === drawerMode ? "text-slate-800" : "text-primary"}`}
                    />
                  </>
                )}

                {children}
              </div>
            </motion.div>
          </motion.div>
        </PortalOverlays>
      ) : null}
    </AnimatePresence>
  );
}
