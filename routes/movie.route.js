import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";
// const ObjectId = require("mongodb").ObjectId;

const router = express.Router();

router.get("/", async function (request, response) {
  const movies = await client
    .db("test")
    .collection("movies")
    .find({})
    .toArray();
  response.send(movies);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  var _id = new ObjectId(id);
  const movie = await client
    .db("test")
    .collection("movies")
    .findOne({ _id: _id });

  // const movie = movies.find((mv) => mv.id === id);
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: "movie not found" });
});

router.post("/post", async function (request, response) {
  const data = request.body;
  // console.log(data)
  // db.movies.insertMany
  const res = await client.db("test").collection("movies").insertMany(data);
  response.send(res);
});
router.post("/post/one", async function (request, response) {
  const data = request.body;
  // console.log(data)
  // db.movies.insertMany
  const res = await client.db("test").collection("movies").insertOne(data);
  response.send(res);
});

router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  var _id = new ObjectId(id);
  console.log(typeof id);
  //db.movies.deleteOne({id: 101});

  const result = await client
    .db("test")
    .collection("movies")
    .deleteOne({ _id: _id });
  console.log(result);

  result.deletedCount > 0
    ? response.send({ msg: "movie was deleted successfully" })
    : response.status(404).send({ msg: "movie not found" });
});

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  var _id = new ObjectId(id);
  const data = request.body;
  // console.log(data)
  // db.movies.updateOne({id : 101}, {$set : "rating: 9"})
  const result = await client
    .db("test")
    .collection("movies")
    .updateOne({ _id: _id }, { $set: data });
  result
    ? response.send(result)
    : response.status(404).send({ msg: "movie not found" });
});

router.post("/:id", async function (request, response) {
  const { id } = request.params;
  var _id = new ObjectId(id);
  const data = request.body;
  // console.log(data)
  // db.movies.updateOne({id : 101}, {$set : "rating: 9"})
  const result = await client
    .db("test")
    .collection("movies")
    .updateOne({ _id: _id }, { $set: data });
  result
    ? response.send(result)
    : response.status(404).send({ msg: "movie not found" });
});

export default router;
