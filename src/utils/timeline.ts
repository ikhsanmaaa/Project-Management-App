import { addDays, differenceInDays } from "date-fns";

export function getTimelineDates(start: Date, end: Date) {
  const days = differenceInDays(end, start);

  return Array.from({ length: days + 1 }, (_, i) => addDays(start, i));
}

export function calculateBarPosition(
  start: Date,
  end: Date,
  timelineStart: Date,
) {
  const offset = differenceInDays(start, timelineStart);
  const duration = differenceInDays(end, start) + 1;

  return {
    offset,
    duration,
  };
}
