const dateConverter = (startTime, endTime) => {
  const now = startTime;
  var commentTime = +new Date(endTime);
  const secondsElapsed = (now - commentTime) / 1000;
  const minutesElapsed = secondsElapsed / 60;
  const hoursElapsed = minutesElapsed / 60;
  const daysElapsed = hoursElapsed / 24;
  const weeksElapsed = daysElapsed / 7;
  var date = 0;
  if (weeksElapsed < 1) {
    if (daysElapsed < 1) {
      if (hoursElapsed < 1) {
        if (minutesElapsed < 1) {
          date = `${secondsElapsed ^ 0} сек`;
        } else date = `${minutesElapsed ^ 0} мин`;
      } else date = `${hoursElapsed ^ 0} цаг`;
    } else date = `${daysElapsed ^ 0} өдөр`;
  } else date = `${weeksElapsed ^ 0} 7 хоног`;
  return date;
};
export default dateConverter;
