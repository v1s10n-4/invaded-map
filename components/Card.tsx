import { cn } from "@/lib/utils";
import {
  Card as RadixThemeCard,
  CardProps,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Text,
  TextProps,
} from "@v1s10n_4/radix-ui-themes";
import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps & { elevation?: boolean }
>(({ className, elevation, ...props }, ref) => (
  <RadixThemeCard
    className={cn(
      elevation &&
        "transition-shadow [box-shadow:--shadow-3] focus-within:shadow-none hover:[box-shadow:--shadow-4]",
      className
    )}
    ref={ref}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ ...props }, ref) => (
    <Flex direction="column" gap="1" px="3" pt="3" ref={ref} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  (props, ref) => (
    <Heading
      as="h3"
      size={{ initial: "4", md: "5", lg: "6" }}
      ref={ref}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => <Text size={{ initial: "1", md: "2" }} ref={ref} {...props} />
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => (
    <Flex direction="column" gap="2" px="3" py="5" ref={ref} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <Flex align="center" justify="end" px="3" pb="3" ref={ref} {...props} />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
