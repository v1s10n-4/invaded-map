import { ACCEPTED_IMAGE_TYPES } from "@/app/account/schema";

import { cn } from "@/lib/utils";
import { TextField } from "@v1s10n_4/radix-ui-themes";
import * as React from "react";
import { ComponentProps } from "react";

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
FileInput.displayName = "FileInput";

export { FileInput };
