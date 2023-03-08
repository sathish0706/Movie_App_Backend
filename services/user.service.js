import { client } from "../index.js";

export async function createUser(data) {

    // console.log(data)
    // db.movies.insertMany
    return await client.db("test").collection("user").insertOne(data)
}
export async function getUserByName(username) {

    return await client.db("test").collection("user").findOne({ username: username })
}