import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { LoggerMiddleware } from './middlewares/loggerMiddleware';
import { SecurityMiddleware } from './middlewares/securityMiddleware';
import TYPES from './constant/types';
import { MessageService } from './service/message';
import { MongoDBClient } from './utils/mongodb/client';
import { Logger } from './utils/logger';
import './controller/message';


// load everything needed to the Container
let container = new Container();

if (process.env.NODE_ENV === 'development') {
    let logger = makeLoggerMiddleware();
    container.applyMiddleware(logger);
}

container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
container.bind<MessageService>(TYPES.MessageService).to(MessageService);
container.bind<Logger>(TYPES.Logger).to(Logger);
container.bind<LoggerMiddleware>(TYPES.LoggerMiddleware).to(LoggerMiddleware)
container.bind<SecurityMiddleware>(TYPES.SecurityMiddleware).to(SecurityMiddleware)

// start the server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(helmet());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');



// Seeding initial Redis whitelist domains to redis db
let redis = require('redis');
// let client = redis.createClient();
var client = redis.createClient('6379', 'redis');
client.on('connect', function() {console.log('Redis client connected');});
client.on('error', function (err) {console.log('Something went wrong with Redis connection' + err);});
console.log('Seeding initial Redis whitelist domains to redis db #1');
client.select(1, function(err,res){
  client.set('website.com', 'true', redis.print);
  client.set('website2.com', 'true', redis.print);
  client.set('website3.com', 'true', redis.print);
}); 

exports = module.exports = app;
