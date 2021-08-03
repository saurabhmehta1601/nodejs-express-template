import { config } from "dotenv";
import connectDb from "./utils/connectDb";
import express from "express"
import { Error } from "mongoose";
config()

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send(`hello `);
  res.end();
});


connectDb().then(()=>{
  console.info(`> MongoDB connection successfull.`);

  app.listen(PORT, () => {
  console.info(`> Express api running on port ${PORT}`);
});
}).catch((e :Error )=>{
  console.error(e.message);  
})

