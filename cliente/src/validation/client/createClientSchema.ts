import { body } from 'express-validator';

export const createClientSchema = [
  body('email').isEmail().withMessage('Provide valid email.'),
  body('firstName').notEmpty().isString().withMessage('Provide valid first name.'),
  body('lastName').notEmpty().isString().withMessage('Provide valid last name.'),
  body('avatar'),
];
