import { body } from 'express-validator';

export const createClientSchema = [
  body('email').notEmpty().isEmail().withMessage('Provide valid email.'),
  body('name').notEmpty().isString().withMessage('Provide valid name.'),
  body('password').notEmpty().isString().withMessage('Provide valid password.'),
  body('phone').isString().withMessage('Provide valid phone.'),
];
