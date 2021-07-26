import React from "react";

export function lazyWithPreload(importFunction) {
    const Component = React.lazy(importFunction);
    Component.preload = importFunction;
    return Component
}