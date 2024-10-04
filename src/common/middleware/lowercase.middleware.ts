import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LowercaseMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.body) {
            Object.keys(req.body).forEach((key) => {
                if (typeof req.body[key] === 'string') {
                    req.body[key] = req.body[key].toLowerCase();
                }
            });
        }
        next();
    }
}