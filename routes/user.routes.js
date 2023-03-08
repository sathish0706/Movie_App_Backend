import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByName } from "../services/user.service.js";
import Jwt from "jsonwebtoken";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(salt)
  // console.log(hashedPassword)
  return hashedPassword;
}
genHashedPassword("password@123");

router.post("/signup", async function (request, response) {
  const { email, username, password } = request.body;
  console.log(email);

  const userFromDB = await getUserByName(username);
  if (userFromDB) {
    response.status(400).send({ msg: "User Already Exist" });
  } else if (password.length < 8) {
    response.status(400).send({ msg: "password must be 8 charactors" });
  } else {
    const hashedPassword = await genHashedPassword(password);
    console.log(hashedPassword, password);
    const res = await createUser({
      username: username,
      password: hashedPassword,
    });
    response.send(res);
  }
});

router.post("/login", async function (request, response) {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);

  // console.log(userFromDB, password);

  if (!userFromDB) {
    response.status(400).send({ msg: "Invalid credential" });
  } else {
    const storedDBPassword = userFromDB.password;
    const isPsswordMatch = await bcrypt.compare(password, storedDBPassword);
    // console.log(isPsswordMatch);
    if (isPsswordMatch) {
      const token = Jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      response.send({ message: "Succesful login...", token: token });
    } else {
      response.status(400).send({ message: "invalid credential" });
    }
  }
});

export default router;
