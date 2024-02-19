const isEqualDates = (date1, date2, options) => {
  const { fullComparizon } = options || {};

  const dateOne = new Date(date1);
  const dateTwo = new Date(date2);

  if (fullComparizon) return dateOne === dateTwo;

  return (
    dateOne.getUTCDate() === dateTwo.getUTCDate() &&
    dateOne.getUTCMonth() === dateTwo.getUTCMonth() &&
    dateOne.getUTCFullYear() === dateTwo.getUTCFullYear()
  );
};

export { isEqualDates };
