import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import * as express from "express";
import TYPES from '../constant/types';
import { Logger } from '../utils/Logger';

@injectable()
export class LoggerMiddleware extends BaseMiddleware {

    @inject(TYPES.Logger) private readonly _logger: Logger;
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        this._logger.log(`Anonymous => ${req.url}`,'info');
        next();
    }
}