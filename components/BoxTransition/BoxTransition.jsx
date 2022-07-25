//
import { useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useStateSwitch } from "../../src/hooks";
//
const DEFAULT_TIMEOUT = 255;
const DEFAULT_TIMEOUT_OUT = 122;
const DEFAULT_EFFECT = {
  in: "fadeIn",
  out: "fadeOut",
};
const TransitionBase = ({
  isActive = false,
  duration = DEFAULT_TIMEOUT,
  durationOut = DEFAULT_TIMEOUT_OUT,
  classNames,
  // delay = 0,
  // repeat = 0,
  // https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp
  // animation-timing-function:
  //   linear|ease|ease-in|ease-out|ease-in-out|
  //   step-start|step-end|steps(int,start|end)|
  //   cubic-bezier(n,n,n,n)|initial|inherit;
  // ease = DEFAULT_EASE,
  className = "",
  children,
  ...rest
}) => {
  const r = useRef();
  const { isActive: isExit, toggle: toggleIsExit } = useStateSwitch();
  const { isActive: hidden, toggle: toggleHidden } = useStateSwitch(true);
  //
  // show div
  useEffect(() => {
    isActive && toggleHidden.off();
  }, [isActive]);
  //
  // toggle duration @stage change
  useEffect(() => {
    const node = r.current;
    if (isActive && node) {
      node.style.setProperty(
        "--animate-duration",
        `${(isExit ? durationOut : duration) / 1000}s`
      );
      // node.style.setProperty("--animate-delay", `${delay / 1000}s`);
      // node.style.setProperty("--animate-repeat", repeat);
      // node.style.setProperty("animation-timing-function", ease);
    }
  }, [isActive, isExit]);
  //
  return (
    <CSSTransition
      classNames={classNames}
      in={isActive}
      timeout={duration}
      onEnter={toggleIsExit.off}
      onEntered={toggleIsExit.on}
      onExited={toggleHidden.on}
      {...rest}
    >
      <div
        ref={r}
        style={{
          transformOrigin: "center",
          display: hidden ? "none" : "block",
        }}
        className={className}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

const BoxTransition = ({
  effect = DEFAULT_EFFECT,
  // isActive,
  // duration,
  // durationOut,
  children,
  ...rest
}) => (
  <TransitionBase
    classNames={{
      enter: "animate__animated",
      enterActive: `animate__${effect.in}`,
      exit: `animate__${effect.out}`,
      exitActive: "animate__animated",
    }}
    {...rest}
  >
    {children}
  </TransitionBase>
);

export default BoxTransition;

//
// export const Fade = ({ in: inProp }) => (
//   <Transition in={inProp} timeout={duration}>
//     {(state) => (
//       <div
//         style={{
//           ...defaultStyle,
//           ...transitionStyles[state],
//         }}
//       >
//         Im a fade Transition!
//       </div>
//     )}
//   </Transition>
// );

/*

classNames={{
 appear: 'my-appear',
 appearActive: 'my-active-appear',
 appearDone: 'my-done-appear',
 enter: 'my-enter',
 enterActive: 'my-active-enter',
 enterDone: 'my-done-enter',
 exit: 'my-exit',
 exitActive: 'my-active-exit',
 exitDone: 'my-done-exit',
}}

<Transition
  in # flag.boolean [false]
  timeot # duration in [ms]; number | { enter?: number, exit?: number, appear?: number }
  //
  addEndListener
  appear # boolean; `enter` @1st-mount, set both `enter` and `in` to `true` | [false]
  nodeRef # Node | function render prop; required
  mountOnEnter # boolean [false]
  unmountOnExit # boolean [false]
  enter # enable `enter`; boolean [true]; 
  exit # enable `exit`: boolean [true]
  //
  onEnter # @ before `entering` | Function(node: HtmlElement, isAppearing: bool) -> void
  onEntering # @ after `entering`
  onEntered # @ after `entered`
  onExit
  onExiting
  onExited
>
</Transition>
*/
