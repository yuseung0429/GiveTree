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

export const formatTime = (time: string) => {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDate = day < 10 ? '0' + day : day;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${year}. ${formattedMonth}. ${formattedDate} ${formattedHours}:${formattedMinutes}`;
};

export const formatDate = (time: string) => {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDate = day < 10 ? '0' + day : day;

  return `${year}-${formattedMonth}-${formattedDate}`;
};
