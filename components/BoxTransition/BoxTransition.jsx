//
import { useRef, useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useStateSwitch } from "../../src/hooks";
import { noop } from "../../src/util";
//
const DEFAULT_TIMEOUT = 543;
const DEFAULT_TIMEOUT_OUT = 245;
const DEFAULT_EFFECT = {
  in: "fadeIn",
  out: "fadeOut",
};
const DEFAULT_EFFECT_switch = {
  in: "flipInY",
  out: "flipOutY",
};
////
////
const TransitionBase = ({
  //
  // reactive flags passed by consumers
  isActive = false,
  in: in_ = null,
  //
  // sensible in/out defaults
  duration = DEFAULT_TIMEOUT,
  durationOut = DEFAULT_TIMEOUT_OUT,
  //
  // lifecycle methods
  onEnter = noop,
  onEntered = noop,
  //
  // css transition definitons
  classNames,
  //
  // transitioned box styles
  className = "",
  //
  // content
  children,
  //
  // misc. <Transition> props
  ...rest
}) => {
  //
  const [inProp, setInProp] = useState(null != in_ ? in_ : isActive);
  // signal transition stage; more @`react-transition-group`
  const { isActive: isExit, toggle: toggleIsExit } = useStateSwitch();
  // animated div ref
  const refDiv = useRef();
  //
  useEffect(() => {
    setInProp(isActive);
  }, [isActive]);
  //
  // switch duration @stage
  useEffect(() => {
    if (inProp) {
      refDiv.current?.style.setProperty(
        "--animate-duration",
        `${(isExit ? durationOut : duration) / 1000}s`
      );
      // node.style.setProperty("--animate-delay", `${delay / 1000}s`);
      // node.style.setProperty("--animate-repeat", repeat);
      // node.style.setProperty("animation-timing-function", ease);
    }
  }, [inProp, isExit]);

  //
  return (
    <CSSTransition
      in={inProp}
      timeout={duration}
      classNames={classNames}
      onEnter={(...args) => {
        toggleIsExit.off();
        onEnter(...args);
      }}
      onEntered={(...args) => {
        toggleIsExit.on();
        onEntered(...args);
      }}
      // hide box when done
      unmountOnExit
      {...rest}
    >
      <div ref={refDiv} className={className}>
        {children}
      </div>
    </CSSTransition>
  );
};
// effect: {in: string, out: string}
const BoxTransition = ({
  effect = DEFAULT_EFFECT,
  //
  children,
  ...rest
}) => (
  // animate.css, react-transition-group
  <TransitionBase
    classNames={{
      enter: "animate__animated",
      enterActive: `animate__${effect.in}`,
      exit: `animate__${effect.out}`,
      exitActive: "animate__animated",
    }}
    //
    // --forwarded props
    //    .isActive
    //    .duration
    //    .durationOut
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

// delay = 0,
// repeat = 0,
// https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp
// animation-timing-function:
//   linear|ease|ease-in|ease-out|ease-in-out|
//   step-start|step-end|steps(int,start|end)|
//   cubic-bezier(n,n,n,n)|initial|inherit;
// ease = DEFAULT_EASE,

export const BoxSwitch = ({
  //
  effect = DEFAULT_EFFECT_switch,
  //
  key,
  // ={ a: Node, b: Node }
  components,
  //
  // out-in | in-out
  mode = "out-in",
}) => {
  const components_ = useRef(components).current;
  console.log(components_[key]);
  ////
  return (
    <SwitchTransition mode={mode}>
      <CSSTransition
        key={key}
        classNames={{
          enter: "animate__animated",
          enterActive: `animate__${effect.in}`,
          exit: `animate__${effect.out}`,
          exitActive: "animate__animated",
        }}
      >
        {components_[key]}
      </CSSTransition>
    </SwitchTransition>
  );
};
