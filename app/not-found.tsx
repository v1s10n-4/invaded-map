import { Colors } from "@/utils";

export const runtime = "edge";

export function ErrorPage() {
  const textShadow = {
    textShadow: `${Colors.accent} 0px 0px 0.2em`,
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-primary">
      <div
        className="flex flex-col items-center gap-5 bg-base-100"
        style={{
          // TODO migrate to tw
          boxShadow: `0px 0px 16px 2px ${Colors.secondary}, 0 0 0 6px black, 0 0 0 10px ${Colors.primary}`,
        }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 border-4 border-primary p-4 lg:gap-6 lg:p-6 lg:pt-8">
          <h1 className="text-5xl lg:text-9xl" style={textShadow}>
            404
          </h1>
          <p className="text-3xl lg:text-5xl" style={textShadow}>
            INVADER
          </p>
          <p className="text-2xl lg:text-4xl" style={textShadow}>
            NOT FOUND
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
