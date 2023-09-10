import DiscordIcon from "@/app/help/discord.svg";
import Link from "next/link";
import { UrlObject } from "url";

export const runtime = "edge";

const DISCORD_INVITE_LINK: UrlObject = new URL(
  process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK!
);
const FeedbackPage = () => (
  <main className="mx-auto flex h-full flex-col items-center gap-8 bg-black px-4 pb-8 pt-32 text-primary md:max-w-screen-md md:px-12">
    <h4 className="text-center text-2xl uppercase md:mt-12 md:text-3xl">
      Thanks for your message!
    </h4>
    <p className="md:text-md text-sm">
      Your feedback matters and helps us grow. Join our Discord to contribute to
      our street art community website&apos;s growth!
    </p>
    <p className="text-xs">
      Your input, ideas, and passion are what fuel our progress. Let&apos;s
      collaborate to create the ultimate hub for street art enthusiasts.
      Together, we&apos;ll shape the future of this website!
    </p>
    <Link
      href={DISCORD_INVITE_LINK}
      className="flex items-center gap-2 border-2 border-dashed border-primary px-6 py-2 text-2xl outline-none"
    >
      <DiscordIcon className="h-16 w-16" /> Discord
    </Link>
  </main>
);

export default FeedbackPage;
