import { differenceInDays } from "date-fns";

type Props = {
  start: Date;
  end: Date;
  timelineStart: Date;
  dayWidth: number;
};

export function TimelineBar({ start, end, timelineStart, dayWidth }: Props) {
  const offset = differenceInDays(start, timelineStart);
  const duration = differenceInDays(end, start) + 1;

  return (
    <div
      className="absolute h-6 bg-blue-500 rounded-md top-3"
      style={{
        left: offset * dayWidth,
        width: duration * dayWidth,
      }}
    />
  );
}
