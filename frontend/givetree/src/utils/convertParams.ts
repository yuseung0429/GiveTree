const convertParams = (params: { [key: string]: string | undefined }) => {
  const result = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return result ? `?${result}` : '';
};

export default convertParams;
