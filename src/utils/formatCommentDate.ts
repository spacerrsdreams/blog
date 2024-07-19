export const formatCommentDate = (date: Date) => {
  const currentTime = new Date();
  const differenceInMilliseconds = currentTime.getTime() - date.getTime();
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;
  const differenceInWeeks = differenceInDays / 7;
  const differenceInMonths = differenceInDays / 30;
  const differenceInYears = differenceInDays / 365;

  if (differenceInMinutes < 1) {
    return "less than a minute ago";
  } else if (differenceInMinutes < 60) {
    const minutes = Math.floor(differenceInMinutes);
    return `about ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (differenceInHours < 24) {
    const hours = Math.floor(differenceInHours);
    return `about ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (differenceInDays < 7) {
    const days = Math.floor(differenceInDays);
    return `about ${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (differenceInWeeks < 4) {
    const weeks = Math.floor(differenceInWeeks);
    return `about ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (differenceInMonths < 12) {
    const months = Math.floor(differenceInMonths);
    return `about ${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(differenceInYears);
    return `about ${years} ${years === 1 ? "year" : "years"} ago`;
  }
};
