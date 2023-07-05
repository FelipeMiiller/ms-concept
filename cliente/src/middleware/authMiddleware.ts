import { NextFunction, Response } from 'express';
import { RequestWithUserId } from 'types/express/custom';
import AuthService from 'services/authService';
import HttpException from 'exceptions/HttpException';

async function authMiddleware(
  request: RequestWithUserId,
  response: Response,
  next: NextFunction,
) {
  if (request.headers.authtoken) {
    try {
      const token = await AuthService.admin
        .auth()
        .verifyIdToken(request.headers.authtoken as string);
      request.userId = token.uid;
      next();
    } catch (_) {
      next(new HttpException(403, 'Found issues with token!'));
    }
  } else {
    next(new HttpException(403, 'No token in header found!'));
  }
}

export default authMiddleware;
