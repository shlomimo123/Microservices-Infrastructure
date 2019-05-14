import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import * as express from "express";
import TYPES from '../constant/types';
import { Logger } from '../utils/logger';

@injectable()
export class SecurityMiddleware extends BaseMiddleware {

    @inject(TYPES.Logger) private readonly _logger: Logger;
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        this._logger.log(`In Security Middleware => ${req.url}`, 'info');

        let isInWhitelist = this.IsInWhitelist(req.headers["crossfw-referer"].toString());
        isInWhitelist.then(value => {
            if (value === false)
                res.sendStatus(403);

            let isNeedToWait = this.NeedToWait(req.connection.remoteAddress.toString());
            isNeedToWait.then(value => {
                if (value === true)
                    res.send('Need To Wait 30 seconds for next request');
                next();
            })
        });

    }

    private IsInWhitelist(cameFromDomain: string): Promise<Boolean> {

        return new Promise<boolean>((resolve, reject) => {
            let redis = require('redis');
            let client = redis.createClient('6379', 'redis');

            client.select(1, function (err, res) {
                client.get(cameFromDomain, function (error, result) {
                    if (!result || result !== "true") {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });
    }

    private NeedToWait(ip: string): Promise<Boolean> {

        return new Promise<boolean>((resolve, reject) => {
            let redis = require('redis');
            let client = redis.createClient('6379', 'redis');

            client.select(2, function (err, res) {
                client.get(ip, function (error, result) {
                    if (!result || result !== "true") {
                        client.set(ip, "true", 'EX', 10, redis.print);
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });
    }
}
