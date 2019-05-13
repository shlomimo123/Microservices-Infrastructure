import {
    HttpResponseMessage, StringContent
} from 'inversify-express-utils';
import { inject,injectable } from 'inversify';
import TYPES from '../constant/types';
import { Logger } from '../utils/Logger';

@injectable()
export class BaseController {

    protected logger;

    constructor(@inject(TYPES.Logger) logger: Logger) {
        this.logger = logger;
    }

    public ReturnInternalError<T>(err): Promise<T> {
        this.logger.log(`Error: ${err}`, 'error');

        const response = new HttpResponseMessage(500);
        response.content = new StringContent(err);
        return new Promise<T>((resolve, reject) => { reject(response); });
    }
}
