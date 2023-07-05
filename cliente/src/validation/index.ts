
import express, { NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import HttpException from 'src/exceptions/HttpException';

const validate = (schemas: ValidationChain[]) => {
  return async (
    request: express.Request,
    _: express.Response,
    next: NextFunction,
  ) => {
    await Promise.all(schemas.map((schema) => schema.run(request)));

    const errors = validationResult(request);
    console.log({ errors });

    if (errors.isEmpty()) {
      return next();
    }

    console.log({ errors: errors.array() });

    return next(
      new HttpException(400, errors.array()[1]?.msg ?? 'Bad request'),
    );
  };
};

export default validate;
