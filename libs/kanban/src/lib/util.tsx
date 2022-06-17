import React from "react";

export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export type ReactChildOrChildren = React.ReactNode | React.ReactNode[]

