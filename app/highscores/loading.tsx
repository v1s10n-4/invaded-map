const RootLoading = () => (
  <ul className="flex w-full flex-col gap-4 px-1">
    {Array(6)
      .fill(undefined)
      .map((_, i) => (
        <li
          key={i}
          className="border border-primary p-4 ring-1 ring-primary ring-offset-2 ring-offset-black"
        >
          <h4>
            #
            <span className="skeleton inline-block h-4 w-6 bg-primary" />:{" "}
            <span
              className="skeleton inline-block h-4 bg-primary"
              style={{ width: i * 10 * Math.round(Math.random() * 10) }}
            />
          </h4>
          <p className="whitespace-nowrap">
            Score:{" "}
            <span className="skeleton inline-block h-4 w-24 bg-primary" />
          </p>
          <p>
            Invaders flashed:{" "}
            <span className="skeleton inline-block h-4 w-16 bg-primary" />
          </p>
          <p>
            Cities discovered:{" "}
            <span className="skeleton inline-block h-4 w-8 bg-primary" />
          </p>
        </li>
      ))}
  </ul>
);
export default RootLoading;
