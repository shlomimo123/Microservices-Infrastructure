import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import { Message } from '../models/message';
import TYPES from '../constant/types';

@injectable()
export class MessageService {
  private mongoClient: MongoDBClient;

  constructor(@inject(TYPES.MongoDBClient) mongoClient: MongoDBClient) {
    this.mongoClient = mongoClient;
  }

  public getMessages(filter: Object, limit: number, skip: number): Promise<Message[]> {
    return new Promise<Message[]>((resolve, reject) => {
      this.mongoClient.find('Message', filter, limit, skip, (error, data: Message[]) => {
        resolve(data);
      });
    });
  }

  public getMessage(id: string, limit: number, skip: number): Promise<Message> {
    return new Promise<Message>((resolve, reject) => {
      this.mongoClient.findOneById('Message', id, (error, data: Message) => {
        resolve(data);
      });
    });
  }

  public newMessage(Message: Message): Promise<Message> {
    return new Promise<Message>((resolve, reject) => {
      this.mongoClient.insert('Message', Message, (error, data: Message) => {
        resolve(data);
      });
    });
  }

  public updateMessage(id: string, Message: Message): Promise<Message> {
    return new Promise<Message>((resolve, reject) => {
      this.mongoClient.update('Message', id, Message, (error, data: Message) => {
        resolve(data);
      });
    });
  }

  public deleteMessage(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.mongoClient.remove('Message', id, (error, data: any) => {
        resolve(data);
      });
    });
  }
}
