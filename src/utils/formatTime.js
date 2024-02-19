function formatTime24(value) {
  const time = value.split(" ");
  const pmTime = time[1] === "pm";
  const hh = time[0].split(":")[0];
  const mm = time[0].split(":")[1];
  const timeStartAdjusted =
    hh < 10 ? `0${time[0]}` : pmTime ? `${+hh + 12}:${mm}` : time;
  return timeStartAdjusted;
}

function formatTime12(value) {
  const time = value.split(":");
  const hours = +time[0];
  const minutes = +time[1];
  const hours12 = hours < 13 ? hours : hours - 12;
  const adjustedHours = hours12 === 0 ? `12` : hours12;
  const adjustedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const adjustedTime = hours < 12 ? "am" : "pm";

  return `${adjustedHours}:${adjustedMinutes} ${adjustedTime}`;
}

export { formatTime24, formatTime12 };
