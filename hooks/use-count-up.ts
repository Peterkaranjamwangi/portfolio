"use client";

import * as React from "react";

/** Ease-out quint: fast off the mark, long settle. */
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

/**
 * Animates a number towards `target`.
 *
 * The estimate total is the one figure on the page a visitor is watching, and
 * a count-up makes a change legible as a change — a jump from 450,000 to
 * 510,000 is easy to miss. Under `prefers-reduced-motion` it snaps instead,
 * because motion is the decoration here, not the information.
 */
export function useCountUp(target: number, durationMs = 400): number {
  const [value, setValue] = React.useState(target);
  const frameRef = React.useRef<number | null>(null);
  const fromRef = React.useRef(target);

  React.useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || durationMs <= 0) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    const from = fromRef.current;
    if (from === target) return;

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const next = from + (target - from) * easeOutQuint(progress);

      setValue(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        // Land exactly on the target: the eased value is only ever asymptotic.
        fromRef.current = target;
        setValue(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      // A run interrupted mid-flight becomes the start of the next one, so the
      // number never snaps backwards before animating again.
      fromRef.current = value;
    };
    // `value` is intentionally excluded: reading it in cleanup is enough, and
    // depending on it would restart the animation on every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return value;
}
