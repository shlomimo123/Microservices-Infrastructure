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
let useragent = require('express-useragent');


@controller('/message')
export class MessageController extends BaseController {

  private messageService;

  constructor(@inject(TYPES.MessageService) messageService: MessageService, @inject(TYPES.Logger) logger: Logger) {
    super(logger);
    this.messageService = messageService;
  }

  @httpGet('/', TYPES.LoggerMiddleware, TYPES.SecurityMiddleware)
  public getMessages(request: Request): Promise<Message[]> {
    try {

      this.logger.log('Getting messages from DB', 'info');

      let filterObj = UrlManipulations.BuildFilterObj(request);
      let messages = this.messageService.getMessages(filterObj.filters, filterObj.limit, filterObj.skip);
      return messages.then(allMessages => {
        if (allMessages.length === 0)
          return this.ReturnInternalError('Nothing to show');
        else
          return new Promise<Message[]>((resolve, reject) => {
            allMessages = ArrayManipulations.MapObjFromArray(allMessages, 'domain');
            resolve(allMessages);
          });
      }).catch(allMessages => {
        return new Promise<Message[]>((reject) => {
          reject(allMessages);
        });
      });
    } catch (err) {
      return this.ReturnInternalError(err);
    }
  }

  @httpPost('/', TYPES.LoggerMiddleware,TYPES.SecurityMiddleware)
  public newMessage(request: Request): Promise<Message> {
    try {
      this.logger.log('Adding Message to DB', 'info');
      let ua = useragent.parse(request.headers['user-agent']);
      let content = request.body;
      content.browser = { "Name": ua.browser, "Version": ua.version };
      content.createdAt = new Date().toISOString();
      content.domain = request.headers["crossfw-referer"]; //this is just for test. we need to take it from 'request.headers.referer'
      return this.messageService.newMessage(content);
    } catch (err) {
      return this.ReturnInternalError(err);
    }
  }
}
