import SplashScreen from "@/public/assets/images/splashscreen.gif";
import Image from "next/image";

export const Loader = () => {
  return (
    <Image
      src={SplashScreen}
      alt="Invaded map slashscreen"
      className="h-full w-full object-contain"
      priority
    />
  );
};

export default Loader;
