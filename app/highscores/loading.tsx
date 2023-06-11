import Image from "next/image";
import SplashScreen from "@/public/assets/images/splashscreen.gif";

const RootLoading = () => (
  <Image
    src={SplashScreen}
    alt="Invaded map slashscreen"
    className="h-full w-full object-contain"
    priority
  />
);
export default RootLoading;
