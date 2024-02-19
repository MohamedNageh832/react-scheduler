import {
  ONE_HOUR_IN_GRID,
  ONE_MINUTE_IN_GRID,
} from "../services/constants/schedulerConstants";

function getOffsetInGrid(time24) {
  const timeSplit = time24.split(":");
  const hours = +timeSplit[0];
  const minutes = +timeSplit[1];
  const hoursAsOffset = hours * ONE_HOUR_IN_GRID;
  const minutesAsOffset = minutes * ONE_MINUTE_IN_GRID;

  return hoursAsOffset + minutesAsOffset;
}

export { getOffsetInGrid };
