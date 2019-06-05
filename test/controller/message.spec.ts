import { expect } from 'chai';
import { MessageController } from '../../controller/message';
import {MessageService} from '../../service/message'
import { MongoDBClient } from '../../utils/mongodb/client';
import { Logger } from '../../utils/logger';

describe('MessageController', () => {
  it('should give back Server Monitor Ack', () => {
    let service = new MessageController(new MessageService(new MongoDBClient()),new Logger());

    expect(service.servermonitor(null)).to.equal('DESKTOP-A9ONDRE');
  });
});
