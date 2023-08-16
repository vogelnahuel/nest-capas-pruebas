import { NextFunction, Request, Response } from 'express';
import { json, OptionsJson } from 'body-parser';
import { PayloadTooLargeException } from '@nestjs/common';

export const jsonBodyParser = (options?: OptionsJson) => (req: Request, res: Response, next: NextFunction) => {
    json(options)(req, res, (err) => {
        if (err) {
            // eslint-disable-next-line eqeqeq
            if (err?.type == 'entity.too.large') {
                const exception = new PayloadTooLargeException('PAYLOAD_TOO_LARGE');
                res.status(exception.getStatus()).json(exception.getResponse());
                return;
            }
            next(err);
        } else {
            next();
        }
    });
};
