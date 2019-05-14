import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import * as express from "express";
import TYPES from '../constant/types';
import { Logger } from '../utils/logger';

@injectable()
export class LoggerMiddleware extends BaseMiddleware {

    @inject(TYPES.Logger) private readonly _logger: Logger;
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        this._logger.log(`HIT => ${req.url}`,'info');
        next();
    }
}