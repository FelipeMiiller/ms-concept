
import express, { NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';



const validate = (schemas: ValidationChain[]) => {
  return async (
    request: express.Request,
    response: express.Response,
    next: NextFunction,
  ) => {
    await Promise.all(schemas.map((schema) => schema.run(request)));

    const errors = validationResult(request);
    
    if (errors.isEmpty()) {
      return next();
    }

    const sendError = {
      status: 422,
      name: 'Unprocessable Entity',
      message: JSON.stringify(errors.array()) ?? 'Bad request'

    }

    response.status(422).send(sendError);
  };
}
export default validate
