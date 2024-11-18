export const mergeClasses = (
  ...classNames: (string | null | undefined | boolean)[]
): string => {
  return classNames.filter(Boolean).join(' ');
};
