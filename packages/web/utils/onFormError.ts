import { FieldErrorResponse } from '@pern-template/shared';
import { Path, UseFormSetError } from 'react-hook-form';

// Handles async validation errors
export const onFormError =
  <T extends object>(setError: UseFormSetError<T>) =>
  (err: unknown) => {
    const fieldErrors = (err as FieldErrorResponse).fieldErrors;
    if (!fieldErrors) return;

    for (let field in fieldErrors) {
      setError(field as Path<T>, { message: fieldErrors[field][0] });
    }
  };
