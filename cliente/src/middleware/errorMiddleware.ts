
import { NextFunction, Request, Response } from 'express';
import HttpException from 'src/exceptions/HttpExceptions';


function errorMiddleware(
  error: HttpException,
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  const sendError = {
    status: error.status || 500,
    name: error.name || 'Something went wrong',
    message: error.message || 'Something went wrong'

  }

  response.status(sendError.status).send(sendError.name);
}

export default errorMiddleware;
