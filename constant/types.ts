const TYPES = {
    MongoDBClient: Symbol.for('MongoDBClient'),
    MessageService: Symbol.for('MessageService'),
    Logger: Symbol.for('Logger'),
    LoggerMiddleware: Symbol.for("LoggerMiddleware"),
    SecurityMiddleware: Symbol.for("SecurityMiddleware"),
    
};

export default TYPES;
