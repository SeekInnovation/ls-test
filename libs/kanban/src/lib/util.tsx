
export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export type JsxChildOrChildren = JSX.Element | JSX.Element[]
