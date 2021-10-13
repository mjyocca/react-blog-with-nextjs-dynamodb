import React, { useState } from 'react';

type useFormResponse<T> = {
  values: T;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
};

export const useForms = <T>(initialValues: any): useFormResponse<T> => {
  const [values, setValues] = useState<T>(initialValues);
  return {
    values,
    setValues,
    handleInputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target;
      setValues(() => ({
        ...values,
        [name]: value,
      }));
    },
  };
};
