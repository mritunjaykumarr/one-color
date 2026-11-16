"use client";

/*
  Word-by-word "dye flash" for section headings — adapted from the Reshoot study:
  each word blinks marigold → sindoor-berry → settles to ink, staggered 0.1s, once,
  when the heading crosses 90% of the viewport. Text is fully visible without JS;
  the animation only runs (and only hides words) after it is triggered.
*/
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import styles from "./FlashText.module.scss";

function splitWords(node, counter) {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, i) =>
      /^\s+$/.test(part) || part === "" ? (
        part
      ) : (
        <span key={`w${counter.i}-${i}`} className={styles.w} style={{ "--i": counter.i++ }}>
          {part}
        </span>
      )
    );
  }
  if (isValidElement(node) && node.props?.children !== undefined && node.type !== "br") {
    return cloneElement(node, { key: `e${counter.i}` }, Children.map(node.props.children, (c) => splitWords(c, counter)));
  }
  return node;
}

export default function FlashText({ as: Tag = "h2", children, className = "", ...rest }) {
  const ref = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const counter = { i: 0 };
  return (
    <Tag ref={ref} className={`${className} ${go ? styles.go : ""}`} {...rest}>
      {Children.map(children, (c) => splitWords(c, counter))}
    </Tag>
  );
}
