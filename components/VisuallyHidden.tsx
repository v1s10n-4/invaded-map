"use client";

import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";

const VisuallyHidden = ({
  ...props
}: React.ComponentProps<typeof VisuallyHiddenPrimitive.Root>) => (
  <VisuallyHiddenPrimitive.Root {...props} />
);
VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
