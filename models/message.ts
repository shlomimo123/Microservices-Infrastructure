import { injectable } from 'inversify';

interface IMessage {
  _id?: string;
}

@injectable()
export class Message implements IMessage {
  constructor(
    public _id?: string
  ) { }
}
