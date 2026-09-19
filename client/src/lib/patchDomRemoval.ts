"use client";

/**
 * Defensive monkey-patch for Node.prototype.removeChild and Node.prototype.insertBefore.
 * 
 * WHY THIS IS CRITICAL:
 * In React 18 and Next.js App Router, third-party libraries that mutate the DOM
 * (such as GSAP ScrollTrigger's pin-spacers, Lenis, or browser extensions like Google Translate)
 * can reparent DOM nodes that React manages.
 * 
 * When a user navigates or switches pages/tabs, React Fiber reconciles the unmounting tree
 * and calls `parent.removeChild(node)`. If the node was reparented (e.g. inside a pin-spacer or <font> tag),
 * the native DOM method throws:
 * "NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."
 * 
 * This patch intercepts the call and safely removes the node from its actual parentNode if different,
 * preventing unhandled React runtime crashes.
 */

if (typeof window !== "undefined") {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child && child.parentNode !== this) {
      if (child.parentNode) {
        return child.parentNode.removeChild(child) as T;
      } else {
        // Node is already detached from the DOM.
        // Returning the child safely bypasses the React NotFoundError crash.
        return child;
      }
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (referenceNode.parentNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode) as T;
      }
      // If referenceNode has no parent, fallback to original to let it handle/throw natively
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

export {};
