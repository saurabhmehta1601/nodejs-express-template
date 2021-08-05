import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const mongod =  MongoMemoryServer.create();

/**
 * Connect to the in-memory database.
 */
export const connect = async () :Promise<void> => {
  const uri = (await mongod).getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
  };
  mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop in-memory database, close the connection and stop mongod.
 */
export const closeDatabase = async () :Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
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
