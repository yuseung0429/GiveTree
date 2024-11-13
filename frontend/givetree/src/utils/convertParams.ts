const convertParams = (params: {
  [key: string]: string | number | string[] | boolean | undefined;
}) => {
  const result = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(',')}`;
      } else {
        return `${key}=${value?.toString()}`;
      }
    })
    .join('&');

  return result ? `?${result}` : '';
};

export default convertParams;
