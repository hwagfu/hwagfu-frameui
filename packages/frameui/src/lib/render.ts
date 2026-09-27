import * as React from "react"
import type { useRender } from "@base-ui/react/use-render"

import { cn } from "./utils"

type AnyProps = Record<string, unknown>

const REACT_LAZY_TYPE = Symbol.for("react.lazy")

/**
 * Turns a component `state` into `data-*` attributes, the same way Base UI's
 * `useRender` does: `true` → `data-key=""`, other truthy values → their string.
 */
function stateAttributes(state: AnyProps | undefined): AnyProps {
  const out: AnyProps = {}
  if (!state) return out
  for (const key in state) {
    const value = state[key]
    if (value === true) out[`data-${key.toLowerCase()}`] = ""
    else if (value) out[`data-${String(key).toLowerCase()}`] = String(value)
  }
  return out
}

function isHandler(key: string, value: unknown): value is (...args: unknown[]) => unknown {
  return (
    typeof value === "function" &&
    key.charCodeAt(0) === 111 /* o */ &&
    key.charCodeAt(1) === 110 /* n */ &&
    key.charCodeAt(2) >= 65 /* A */ &&
    key.charCodeAt(2) <= 90 /* Z */
  )
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") return ref(value)
  if (ref) (ref as React.RefObject<T | null>).current = value
  return undefined
}

function composeRefs<T>(a: React.Ref<T>, b: React.Ref<T>): React.RefCallback<T> {
  return (node) => {
    const cleanA = setRef(a, node)
    const cleanB = setRef(b, node)
    return () => {
      if (typeof cleanA === "function") cleanA()
      else setRef(a, null)
      if (typeof cleanB === "function") cleanB()
      else setRef(b, null)
    }
  }
}

/**
 * Merges the component's props with the props already on the `render`
 * element. The element's own props win, `className` is merged through
 * tailwind-merge, `style` objects are joined and event handlers are chained
 * (the element's handler runs first) — the same contract as Base UI.
 */
function mergeRenderProps(ours: AnyProps, theirs: AnyProps): AnyProps {
  const merged: AnyProps = { ...ours }
  for (const key in theirs) {
    const value = theirs[key]
    if (key === "className") {
      merged.className = cn(ours.className as string, value as string)
    } else if (key === "style") {
      merged.style = { ...(ours.style as object), ...(value as object) }
    } else if (key === "ref") {
      const own = ours.ref as React.Ref<unknown> | undefined
      merged.ref = own && value ? composeRefs(own, value as React.Ref<unknown>) : (value ?? own)
    } else if (isHandler(key, value) && isHandler(key, ours[key])) {
      const ourHandler = ours[key] as (...args: unknown[]) => unknown
      merged[key] = (...args: unknown[]) => {
        const result = value(...args)
        ourHandler(...args)
        return result
      }
    } else {
      merged[key] = value
    }
  }
  return merged
}

/**
 * A hook-free stand-in for Base UI's `useRender`.
 *
 * `useRender` is a hook, so every shadcn component built on it (Badge,
 * Breadcrumb, Item…) becomes a Client Component. This helper keeps the exact
 * same `render` prop contract — an element to clone or a `(props, state)`
 * function — without touching React state, so the component stays a
 * Server Component and ships no JavaScript. Inside a Client Component it
 * behaves exactly the same.
 */
export function renderElement<State extends AnyProps = AnyProps>(
  defaultTagName: keyof React.JSX.IntrinsicElements,
  render: useRender.RenderProp<State> | undefined,
  props: AnyProps,
  state?: State
): React.ReactElement {
  const outProps: AnyProps = { ...stateAttributes(state), ...props }

  let element: unknown = render
  // A render element created in a Server Component reaches the client as a
  // lazy wrapper; unwrap it so its props can be read.
  if (
    element !== null &&
    typeof element === "object" &&
    (element as { $$typeof?: symbol }).$$typeof === REACT_LAZY_TYPE
  ) {
    const unwrapped = React.Children.toArray(element as React.ReactNode)[0]
    if (React.isValidElement(unwrapped)) element = unwrapped
  }

  if (typeof element === "function") {
    return (element as (p: AnyProps, s: State) => React.ReactElement)(
      outProps,
      (state ?? {}) as State
    )
  }

  if (React.isValidElement(element)) {
    return React.cloneElement(
      element,
      mergeRenderProps(outProps, element.props as AnyProps)
    )
  }

  if (defaultTagName === "button" && outProps.type === undefined) {
    outProps.type = "button"
  }
  return React.createElement(defaultTagName, outProps)
}

export type { useRender }
