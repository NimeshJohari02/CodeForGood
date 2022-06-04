const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../db/connection");
const user = require("../models/User");

router.get("/", (req, res) => {
  res.send("Sending from auth");
});
//login basic api
//get all fellows for a   pa
//get all pa from pm

// LOGIN AUTHENTICATION
router.post("/login", async (req, res) => {
  try {
    // let token;
    const { username, password } = req.body;
    // console.log(username)

    if (!username || !password) {
      res.status(400).json({ error: "fill all the fields " });
    }

    const userLogin = await user.findOne({ username: username });
    // console.log(userLogin)
    // token auth
    // token = await userLogin.generateAuthToken();
    // console.log(token)

    // res.cookie("jwtoken", token, {
    //     expires : new Date(Date.now() + 258922000000),
    //     httpOnly : true
    // });

    if (userLogin) {
      // match password
      console.log(userLogin.password);
      console.log(password);
      // const isMatch =  compare(password, userLogin.password)
      // console.log(isMatch)
      if (password == userLogin.password) {
        res.status(200).json({ message: "User logged in " });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(404).json({ err });
  }
});

router.get("/login/retrieve/fellow", async (req, res) => {});

module.exports = router;
