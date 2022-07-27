export const getFocusableChildren = (node?: HTMLElement | null | undefined) =>
  node
    ? node.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    : [];
