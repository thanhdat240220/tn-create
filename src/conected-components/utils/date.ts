export const toDate = ({ date }: { date: Date | string }) => {
  if (date instanceof Date) return date;
  if (!date || typeof date !== "string" || date.length === 0) return null;
  const convertedString = date.replace(/-/g, "/").replace(/T.+/, "");
  const dateObj = Date.parse(convertedString);
  if (!dateObj) return null;
  return new Date(dateObj);
};

export const getDaysBetween = function ({
  start,
  end,
}: {
  start: number | Date;
  end: number | Date;
}) {
  if (!(start instanceof Date) || !(end instanceof Date)) return [];
  for (var a = [], d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
};

export const getWeekEnd = ({ date }: { date: Date | string }) => {
  const d = new Date(date);
  if (d.toString() === "Invalid Date") {
    return null;
  }
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + (d.getDay() === 0 ? 0 : 7) - d.getDay()
  );
};

export const isLastDayOfMonth = ({ date }: { date: Date }) =>
  date.getDate() ===
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
