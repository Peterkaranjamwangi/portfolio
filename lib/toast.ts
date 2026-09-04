"use client";

import * as React from "react";

/**
 * A three-function toast store.
 *
 * The estimator is the only surface in the app that needs transient
 * confirmation, which does not justify pulling in a toast library — so this is
 * the whole thing: raise, subscribe, auto-dismiss.
 */

export type ToastTone = "success" | "error" | "info";

export interface Toast {
  id: number;
  tone: ToastTone;
  message: string;
}

const DISMISS_AFTER_MS = 5_000;

let toasts: Toast[] = [];
let nextId = 1;

const listeners = new Set<() => void>();
const timers = new Map<number, ReturnType<typeof setTimeout>>();

function emit() {
  for (const listener of listeners) listener();
}

function push(tone: ToastTone, message: string) {
  const id = nextId++;
  toasts = [...toasts, { id, tone, message }];
  emit();

  timers.set(
    id,
    setTimeout(() => dismiss(id), DISMISS_AFTER_MS),
  );
}

export function dismiss(id: number) {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export const toast = {
  success: (message: string) => push("success", message),
  error: (message: string) => push("error", message),
  info: (message: string) => push("info", message),
};

export function useToasts(): Toast[] {
  return React.useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => toasts,
    () => EMPTY,
  );
}

// A stable empty array: returning a fresh `[]` from the server snapshot would
// make useSyncExternalStore believe the store changed on every render.
const EMPTY: Toast[] = [];
