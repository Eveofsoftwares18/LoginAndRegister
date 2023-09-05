import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import bcrypt from "bcrypt";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const saltRounds = 10;
mongoose.connect("mongodb://127.0.0.1:27017/userinfoDB", {
  useNewUrlParser: true,
});
// creating a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes defining
app.post("/register", function (req, res) {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
    .exec()
    .then(function (founduser) {
      if (founduser) {
        res.send({ message: "user already Registered" });
      } else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          const newUser = new User({
            name: name,
            email: email,
            password: hash,
          });
          newUser
            .save()
            .then(function () {
              res.send({
                message: "user successfully registered,Please login Now.",
              });
            })
            .catch(function (err) {
              console.log(err);
            });
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(function (founduser) {
      if (founduser) {
        bcrypt.compare(password, founduser.password, function (err, result) {
          if (result === true) {
            res.send({ message: "Successfully Logged in", user: founduser });
          } else {
            res.send({ message: "Password Didnot match" });
          }
        });
      } else {
        res.send({ message: "user not found" });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(9002, () => {
  console.log("succesfully running on the port 9002");
});
