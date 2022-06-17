import React from "react";

export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export type ReactChildOrChildren = React.ReactNode | React.ReactNode[]

export function deepCopy<T>(jsonLikeValue: T): T {
  // the following deep copy is slow, but I would use 'Structured Cloning' in an up-to-date NodeJS:
  // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
  return JSON.parse(JSON.stringify(jsonLikeValue)) as T;
}
