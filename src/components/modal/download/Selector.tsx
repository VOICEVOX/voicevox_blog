export default function Selector<T extends string>({
  label,
  selected,
  setSelected,
  candidates,
}: {
  label: string;
  selected: T;
  setSelected: (selected: T) => void;
  candidates: T[];
}) {
  return (
    <div className="gap-2xs py-xs sm:px-2xl flex flex-col items-center justify-center sm:flex-row sm:justify-between">
      <p className="text-center text-lg font-semibold text-black sm:w-1/3">
        {label}
      </p>
      <div className="gap-xs flex flex-wrap items-center justify-center sm:w-2/3">
        {candidates.map((candidate, index) => {
          const isSelected = candidate === selected;
          return (
            <button
              key={index}
              className={
                isSelected
                  ? "vv-status-layer px-xl inline-flex items-center justify-center rounded-full border-none bg-emerald-400 py-2.5 text-base font-semibold text-black"
                  : "vv-status-layer px-xl inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white py-2.5 text-base font-normal text-black shadow-sm"
              }
              onClick={() => setSelected(candidate)}
              type="button"
            >
              {candidate}
            </button>
          );
        })}
      </div>
    </div>
  );
}
