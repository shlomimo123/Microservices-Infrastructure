import {
  controller, httpGet, httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { Message } from '../models/message';
import { MessageService } from '../service/message';
import TYPES from '../constant/types';
import { Logger } from '../utils/logger';
import { BaseController } from './baseController'
import { UrlManipulations } from '../utils/urlManipulations'
import { ArrayManipulations } from '../utils/arrayManipulations'
import { NextFunction } from 'connect';
let useragent = require('express-useragent');
let os = require('os');

@controller('/message')
export class MessageController extends BaseController {

  private messageService;

  constructor(@inject(TYPES.MessageService) messageService: MessageService, @inject(TYPES.Logger) logger: Logger) {
    super(logger);
    this.messageService = messageService;
  }

  @httpGet('/', TYPES.LoggerMiddleware, TYPES.SecurityMiddleware)
  public async getMessages(request: Request, next: NextFunction): Promise<Message[]> {
    try {

      this.logger.log('Getting messages from DB', 'info');

      let filterObj = UrlManipulations.BuildFilterObj(request);
      let messages = await this.messageService.getMessages(filterObj.filters, filterObj.limit, filterObj.skip);
      if (messages.length === 0)
      {
         return await this.ReturnInternalError('Nothing to show');
      }
      else {
        return Promise.resolve(ArrayManipulations.MapObjFromArray(messages, 'domain'));
      }
    } catch (e) {
      let err: Error = e;
      return this.ReturnInternalError(err.message);
    }
  }

  @httpGet('/servermonitor')
  public async servermonitor(request: Request): Promise<string> {
    try {
      return Promise.resolve(os.hostname());
    } catch (e) {
      let err: Error = e;
      return this.ReturnInternalError(err.message);
    }
  }

  @httpPost('/', TYPES.LoggerMiddleware, TYPES.SecurityMiddleware)
  public async newMessage(request: Request): Promise<Message> {
    try {
      this.logger.log('Adding Message to DB', 'info');
      let ua = useragent.parse(request.headers['user-agent']);
      let content = request.body;
      content.browser = { "Name": ua.browser, "Version": ua.version };
      content.createdAt = new Date().toISOString();
      content.domain = request.headers["crossfw-referer"]; //this is just for test. we need to take it from 'request.headers.referer'
      return await this.messageService.newMessage(content);
    } catch (e) {
      let err: Error = e;
      return this.ReturnInternalError(err.message);
    }
  }
}
