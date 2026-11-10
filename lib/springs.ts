// Motion tokens, from Fluid Functionalism (https://www.fluidfunctionalism.com/docs/motion).
// Each tier is the ENTER transition (critically damped, except slow, which keeps a little
// bounce); `.exit` is the matching EXIT: a plain tween, one tier quicker.
//
//   transition={spring.fast}                              // enter
//   exit={{ opacity: 0, transition: spring.fast.exit }}   // leave
//
// The bigger the thing that moves, the slower the spring.
export const spring = {
  fast: {
    type: "spring" as const,
    duration: 0.08,
    bounce: 0,
    exit: { duration: 0.06 },
  },
  moderate: {
    type: "spring" as const,
    duration: 0.16,
    bounce: 0,
    exit: { duration: 0.12 },
  },
  slow: {
    type: "spring" as const,
    duration: 0.24,
    bounce: 0.12,
    exit: { duration: 0.16 },
  },
} as const;
