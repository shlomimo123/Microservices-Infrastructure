import { createLogger, format, transports } from 'winston';
import { injectable } from 'inversify';

const { combine, timestamp, prettyPrint } = format;

@injectable()
export class Logger {
    private logger;

    constructor() {
        this.logger = createLogger({
            format: combine(
                timestamp(),
                prettyPrint(),
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: './error.log', level: 'error' }),
                new transports.File({ filename: './info.log', level: 'info' }),
            ],
            exitOnError: false,
        });
    }


    public log(message: string, level: string): void {
        this.logger.log({ message: message, level: level });
    }
}
