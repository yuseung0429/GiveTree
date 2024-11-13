export const getTimeDifference = (time: string) => {
  const date = new Date(time).getTime();
  const now = new Date().getTime();

  const difference = (now - date) / 1000;

  if (difference < 60) {
    return '방금 전';
  }

  if (difference < 3600) {
    return `${Math.floor(difference / 60)}분 전`;
  }

  if (difference < 3600 * 24) {
    return `${Math.floor(difference / 3600)}시간 전`;
  }

  return `${Math.floor(difference / 3600 / 24)}일 전`;
};
