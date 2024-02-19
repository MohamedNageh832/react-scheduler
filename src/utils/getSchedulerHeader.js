const weekDays = {
  0: "sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "saturday",
};

const getSchedulerHeader = (date) => {
  let startDay = new Date(date).getDay();
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

  const newHeader = [...Array(7)].map((_, i) => {
    const dateTime = new Date(date).getTime() + i * DAY_IN_MILLISECONDS;

    if (startDay === 7) startDay = 0;
    const result = { day: weekDays[startDay], date: new Date(dateTime) };

    startDay++;
    return result;
  });

  return newHeader;
};

export { getSchedulerHeader };
