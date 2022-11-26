const weekDays = {
  0: "sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "saturday",
};

const getSchedulerHeader = (value) => {
  const startDate = new Date(value).getDate();
  let startDay = new Date(value).getDay();

  const newHeader = [...Array(7)].map((_, i) => {
    if (startDay === 7) startDay = 0;
    const result = { day: weekDays[startDay], date: i + startDate };

    startDay++;
    return result;
  });

  return newHeader;
};

export default getSchedulerHeader;
