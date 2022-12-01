const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  const adjustedMonth = mm < 10 ? `0${mm}` : mm;
  const adjustedDay = dd < 10 ? `0${dd}` : dd;

  return `${yyyy}-${adjustedMonth}-${adjustedDay}`;
};

export { formatDate };
