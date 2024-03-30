import { FC, Suspense, SVGProps, useMemo } from "react";
import icons from "@/components/Icon/icons";

export type IconId = keyof typeof icons;
export type IconProps = {
  icon: IconId;
} & Omit<SVGProps<SVGElement>, "width" | "height">;

export const Icon: FC<IconProps> = ({ icon, ...rest }) => {
  const Svg = useMemo(() => icons[icon], [icon]);
  if (!Svg) return null;
  const defaultClassName = `h-6 w-6`;
  return (
    <Suspense fallback={<div className={defaultClassName} />}>
      <Svg
        // @ts-ignore
        width={24}
        height={24}
        className={defaultClassName}
        {...rest}
      />
    </Suspense>
  );
};

export default Icon;
