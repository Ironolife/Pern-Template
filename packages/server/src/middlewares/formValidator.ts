import { FieldErrorResponse } from '@pern-template/shared';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'zod';

export const formValidator =
  <T>(location: 'body' | 'query', schema: Schema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Grab form values from either req.body or req.query
    const formValues = req[location] as T;

    // Validate form values
    const result = schema.safeParse(formValues);

    if (result.success) {
      // Assign parsed form values back to request
      req[location] = result.data;

      return next();
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;

      return res.status(400).send({ fieldErrors } as FieldErrorResponse);
    }
  };
