import {
    controller, httpGet, httpPost
  } from 'inversify-express-utils';
  import { inject } from 'inversify';
  import { Request } from 'express';
  import { Message } from '../models/message';
  import { MessageService } from '../service/message';
  import TYPES from '../constant/types';
  import { Logger } from '../utils/Logger';
  
  @controller('/message')
  export class MessageController {
  
    private messageService;
    private logger;

    constructor( @inject(TYPES.MessageService) messageService: MessageService,
                 @inject(TYPES.Logger) logger: Logger) { 
      this.messageService=messageService;
      this.logger=logger;
    }
  
    @httpGet('/')
    public getMessages(): Promise<Message[]> {
      this.logger.log('Getting messages','info');
      return this.messageService.getMessages();
    }
  
    @httpGet('/:id')
    public getMessageByID(request: Request): Promise<Message> {
      this.logger.log(`Getting message bt ID: ${ request.params.id }`,'info');
      return this.messageService.getMessage(request.params.id);
    }
  
    @httpPost('/')
    public newMessage(request: Request): Promise<Message> {
      this.logger.log('Adding Message','info');
      return this.messageService.newMessage(request.body);
    }
  }
  