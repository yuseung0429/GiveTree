import { ChangeEvent, useCallback, useState } from 'react';

const useNumericInput = (
  min: number = 0,
  max: number = 9_999_999_999
): [
  number,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
] => {
  const [value, setValue] = useState<number>(0);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        Math.min(
          Math.max(min, parseInt(e.target.value.replaceAll(',', ''))),
          max
        ) || min;
      e.target.value = value.toLocaleString();
      setValue(value);
    },
    [min, max]
  );

  return [value, handleChange];
};

export default useNumericInput;
