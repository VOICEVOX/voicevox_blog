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
    <div className="flex flex-col items-center justify-center gap-4 py-2 sm:flex-row sm:justify-between">
      <p className="text-center text-xl font-bold text-neutral-900 sm:w-1/3">
        {label}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:w-2/3">
        {candidates.map((candidate, index) => {
          const isSelected = candidate === selected;
          return (
            <button
              key={index}
              className={
                isSelected
                  ? "inline-flex items-center justify-center rounded-full border-none bg-emerald-400 px-6 py-2.5 text-base font-semibold text-black hover:bg-emerald-500 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:outline-none"
                  : "inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-2.5 text-base font-normal text-black hover:bg-neutral-50 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:outline-none"
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
