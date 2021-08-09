import app from "./app";
import connectDb from "./utils/connectDb";
import { Error } from "mongoose";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(">Express server running");

  connectDb()
    .then(() => {
      console.info(`> MongoDB connection successfull.`);
    })
    .catch((e: Error) => {
      console.error("MongoError name => ", e.name);
      console.error("MongoError message => ", e.message);
    });
});
