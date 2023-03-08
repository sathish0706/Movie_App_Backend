// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movie.route.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
origin: 'http://localhost:3000',
credentials: true
}));

const PORT = process.env.PORT;

//  const MONGO_URL = "mongodb://127.0.0.1";

const MONGO_URL = process.env.MONGO_URL;
// console.log(process.env.MONGO_URL)

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongodb is connected");

app.use(express.json());

app.get("/", async function (request, response) {
  response.send("hello world");
});

app.use("/movies", moviesRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
