export const formatNumberWithK = (num: number) =>
  num > 1000 ? `${(num / 1000).toFixed(1)}k` : num;
