import { format } from "date-fns";

type Props = {
  dates: Date[];
};

export function TimelineHeader({ dates }: Props) {
  return (
    <div
      className="grid border-b"
      style={{
        gridTemplateColumns: `220px repeat(${dates.length}, minmax(60px,1fr))`,
      }}
    >
      <div className="p-3 border-r font-medium">Task</div>

      {dates.map((date) => (
        <div
          key={date.toISOString()}
          className="text-xs text-center py-2 border-r"
        >
          {format(date, "MMM d")}
        </div>
      ))}
    </div>
  );
}
