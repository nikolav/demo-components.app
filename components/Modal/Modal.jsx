import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "../icons";
import PortalOverlays from "../PortalOverlays";
import modcss from "./Modal.module.css";
import { useWindowAddEvents, useClickAway } from "../../src/hooks";
import { noop } from "../../src/util";
//
const EFFECT = {
  "slide.in": {
    y: 0,
    opacity: 1,
  },
  "hidden.bellow": {
    y: "122%",
    opacity: 0,
    scale: 1,
  },
  "hide.puff": {
    opacity: 0,
    scale: 1.22,
  },
};

//
const Modal = ({
  //
  isActive = false,
  //
  onClose = noop,
  // [ms]
  duration = 345,
  // tween | spring
  animation = "spring",
  //
  children,
  //
  ...rest
  //
}) => {
  //
  const root = useRef();
  //
  // schedule evt-handler when component mounts
  //   close modal @key.escape
  useWindowAddEvents(
    "keyup",
    ({ keyCode }) => 27 === keyCode && onClose(),
    isActive
  );
  //
  // close @click outside modal
  useClickAway(root, onClose, isActive);
  //
  const transitionType = {
    ...("tween" !== animation
      ? {
          type: "spring",
        }
      : {
          type: "tween",
          ease: "easeOut",
        }),
    duration: duration / 1000,
  };
  //
  return (
    <AnimatePresence>
      {isActive && (
        <PortalOverlays>
          {/*  */}
          {/* backdrop */}
          <div
            onClick={onClose}
            className={`fixed inset-0 z-[1] bg-slate-500/50 backdrop-blur-md ${modcss.modalBackdrop}`}
          />
          {/*  */}
          {/* modal */}
          <motion.div
            ref={root}
            key="Modal.utsthdsdkpa"
            initial={EFFECT["hidden.bellow"]}
            animate={{
              ...EFFECT["slide.in"],
              transition: transitionType,
            }}
            exit={{
              ...EFFECT["hide.puff"],
              transition: {
                ...transitionType,
                // hide faster by 1.22
                duration: duration / 1000 / 1.22,
              },
            }}
            className={`fixed z-10 overflow-hidden bg-white rounded-0 inset-0 sm:shadow-md sm:rounded-2xl sm:inset-4 md:inset-6 md:inset-x-16 lg:inset-y-8 lg:inset-x-24 lg:mx-auto lg:tall:inset-y-20 max-w-4xl sm:max-h-[720px] dark:bg-slate-800 ${modcss.modal}`}
            {...rest}
          >
            <MdClose onClick={onClose} className="icon-close" />
            {children}
          </motion.div>
        </PortalOverlays>
      )}
    </AnimatePresence>
  );
};

export default Modal;
