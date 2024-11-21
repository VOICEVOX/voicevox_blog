export default <T extends string>({
  label,
  selected,
  setSelected,
  candidates,
}: {
  label: string;
  selected: T;
  setSelected: (selected: T) => void;
  candidates: T[];
}) => {
  return (
    <div className="columns is-tablet is-centered is-vcentered py-0 my-2">
      <div className="column is-3 py-0 my-1">
        <p className="has-text-centered is-size-5 has-text-weight-bold">
          {label}
        </p>
      </div>
      <div className="column is-6 py-0 my-1">
        <div className="buttons is-centered">
          {candidates.map((candidate, index) => (
            <button
              key={index}
              className={`button is-rounded ${
                candidate == selected
                  ? "is-success has-text-weight-semibold"
                  : ""
              }`}
              onClick={() => setSelected(candidate)}
              type="button"
            >
              <span>{candidate}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
