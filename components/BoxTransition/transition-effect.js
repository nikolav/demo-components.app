export const EFFECT = {
  fadeIn: {
    init: ({ timeout, ease }) => ({
      transition: `opacity ${timeout}ms ${ease}`,
      opacity: 0,
    }),
    stage: () => ({
      // animate to
      entering: { opacity: 1 },
      // set after transition-in done
      entered: { opacity: 1 },
      // animate @unmount
      exiting: { opacity: 0 },
      // set when animate-out done
      exited: { opacity: 0 },
    }),
  },
  fadeInX: {
    init: ({ timeout, ease, x }) => ({
      transition: `transform ${timeout}ms ${ease}`,
      //
      transform: `translateX(${x}px)`,
      opacity: 0,
    }),
    stage: ({ x }) => ({
      // animate to
      entering: { opacity: 1, transform: `translateX(0)` },
      // set after transition-in done
      entered: { opacity: 1, transform: `translateX(0)` },
      // animate @unmount
      exiting: { opacity: 0, transform: `translateX(${x})` },
      // set when animate-out done
      exited: { opacity: 0, transform: `translateX(${x})` },
    }),
  },
  fadeInY: {
    init: ({ timeout, ease, y }) => ({
      transition: `transform ${timeout}ms ${ease}`,
      //
      transform: `translateY(${y}px)`,
      opacity: 0,
    }),
    stage: ({ y }) => ({
      // animate to
      entering: { opacity: 1, transform: `translateY(0)` },
      // set after transition-in done
      entered: { opacity: 1, transform: `translateY(0)` },
      // animate @unmount
      exiting: { opacity: 0, transform: `translateY(${y})` },
      // set when animate-out done
      exited: { opacity: 0, transform: `translateY(${y})` },
    }),
  },
};
