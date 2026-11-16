"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/*
  Scroll reveal. Content is always rendered (never gated): it starts slightly offset/faded
  and settles. `stagger` animates direct children in sequence (60ms apart).
*/
export default function Reveal({ as = "div", children, delay = 0, y = 28, stagger = false, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (stagger) {
    return (
      <Tag
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: delay } } }}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ as = "div", children, className, y = 24, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
