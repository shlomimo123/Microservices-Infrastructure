import { Db, ObjectID } from 'mongodb';
import { injectable } from 'inversify';
import { MongoDBConnection } from './connection';
import { Message } from '../../models/message';

@injectable()
export class MongoDBClient {
  public db: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public find(collection: string, filter: Object, limit: number, skip: number, result: (error, data) => void): void {
    this.db.collection(collection).find(filter).skip(skip).limit(limit).toArray((error, find) => {
      return result(error, find);
    });
  }

  public findOneById(collection: string, objectId: string,result: (error, data) => void): void {
    this.db.collection(collection).find({ _id: new ObjectID(objectId) }).limit(1).toArray((error, find) => {
      return result(error, find[0]);
    });
  }

  public insert(collection: string, model: Message, result: (error, data) => void): void {
    this.db.collection(collection).insertOne(model, (error, insert) => {
      return result(error, insert.ops[0]);
    });
  }

  public update(collection: string, objectId: string, model: Message, result: (error, data) => void): void {
    this.db.collection(collection).updateOne(
      { _id: new ObjectID(objectId) },
      { $set: model },
      (error, update) => result(error, model)
    );
  }

  public remove(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).deleteOne({ _id: new ObjectID(objectId) }, (error, remove) => {
      return result(error, remove);
    });
  }
}
