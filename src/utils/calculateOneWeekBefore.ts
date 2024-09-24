const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export const calculateOneWeekBefore = () => {
  return new Date(Date.now() - ONE_WEEK);
};
