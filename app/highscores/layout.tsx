import { redirect } from "next/navigation";
import Search from "pixelarticons/svg/search.svg";
import { FC, PropsWithChildren } from "react";

const search = async (data: FormData) => {
  "use server";
  const value = data.get("search");
  if (value) redirect(`/highscores/search/${value}`);
  else redirect("/highscores");
};
const HighScoreLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <main className="flex flex-col justify-center gap-4 bg-black px-2 pb-8 pt-32 text-white">
      <form action={search} className="relative flex">
        <Search className="absolute inset-y-0 left-2 h-full w-7 place-self-center md:w-6" />
        <input
          name="search"
          type="text"
          placeholder="Search"
          className="caret input input-bordered w-full border-primary px-10 caret-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        />
        {/*{query && (*/}
        {/*  <button*/}
        {/*    onClick={clear}*/}
        {/*    className="absolute inset-y-0 right-0 h-full w-10 place-self-center hover:text-primary focus-visible:text-primary"*/}
        {/*  >*/}
        {/*    <CloseBox className="ml-1 h-6 w-6" />*/}
        {/*  </button>*/}
        {/*)}*/}
      </form>
      {children}
    </main>
  );
};

export default HighScoreLayout;
