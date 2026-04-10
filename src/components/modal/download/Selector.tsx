import * as ToggleGroup from "@radix-ui/react-toggle-group";

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
  const labelId = `selector-label-${label}`;
  return (
    <div className="gap-2xs py-xs sm:px-2xl flex flex-col items-center justify-center sm:flex-row sm:justify-between">
      <p
        id={labelId}
        className="text-center text-lg font-semibold text-black sm:w-1/3"
      >
        {label}
      </p>
      <ToggleGroup.Root
        type="single"
        value={selected}
        onValueChange={(value) => {
          if (value) {
            setSelected(value as T);
          }
        }}
        orientation="horizontal"
        aria-labelledby={labelId}
        className="gap-xs flex flex-wrap items-center justify-center sm:w-2/3"
      >
        {candidates.map((candidate, index) => {
          return (
            <ToggleGroup.Item
              key={index}
              value={candidate}
              className="vv-status-layer vv-button vv-button-shape-pill vv-button-size-md vv-button-without-icon data-[state=off]:vv-button-kind-outline data-[state=off]:vv-button-tone-neutral data-[state=on]:vv-button-kind-solid data-[state=on]:bg-emerald-400 data-[state=on]:text-black"
            >
              {candidate}
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </div>
  );
}
