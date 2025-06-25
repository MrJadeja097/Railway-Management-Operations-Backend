import {
  NestMiddleware,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

export class AuthenticateTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Session expired or No token found.   Do Login.',
        error: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    next();
  }
}
