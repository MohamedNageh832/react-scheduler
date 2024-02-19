const getCurrentTime = () => {
  const current24Hour = new Date().getHours();
  const pmTime = current24Hour > 11;
  const currentHour =
    pmTime && current24Hour !== 12 ? current24Hour - 12 : current24Hour;

  return { currentHour, pmTime, current24Hour };
};

export default getCurrentTime;
