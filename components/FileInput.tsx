import { ACCEPTED_IMAGE_TYPES } from "@/app/account/schema";
import { TextField } from "@radix-ui/themes";
import { ComponentProps } from "react";
import * as React from "react";

import { cn } from "@/lib/utils";

const FileInput = React.forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<typeof TextField.Root>, "type">
>(({ className, ...props }, ref) => {
  return (
    <TextField.Root
      ref={ref}
      name="image"
      type={"file" as "text"}
      // @ts-ignore
      accept={ACCEPTED_IMAGE_TYPES.join(", ")}
      className={cn(
        "text-xs [&>input]:self-center [&>input]:text-ellipsis [&>input]:text-nowrap",
        className
      )}
      {...props}
    />
  );
});
FileInput.displayName = "Input";

export { FileInput };
