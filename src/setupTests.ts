import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const mongod = new MongoMemoryServer() as any;

/**
 * Connect to the in-memory database.
 */
export const connect = async () :Promise<void> => {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };
  mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop in-memory database, close the connection and stop mongod.
 */
export const closeDatabase = async () :Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections inside in-memory database.
 */
export const clearDatabase = async () :Promise<void> => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
