const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel = require("./models/Customers");
const ManagerModel = require("./models/Manager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const app = express();
// const corsConfig = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
//   credentials: true,
// };
app.use(
  cors({
    origin: process.env.FRONT_END,
  })
);
const secret = crypto.randomBytes(32).toString("hex");
app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// HOME PAGE
app.get("/", (req, res) => {
  res.send("HI");
});

// GET USER PAGE
app.post("/getuser", async (req, res) => {
  try {
    const senduser = await CustomerModel.findOne({
      _id: req.body.id,
    });
    if (senduser) {
      res.send({ senduser });
    } else {
      res.send({ message: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CUSTOMER LOGIN PAGE
app.post("/customerlogin", async (req, res) => {
  try {
    const checkCustomer = await CustomerModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (checkCustomer) {
      const token_id = checkCustomer._id;
      jwt.sign(
        { token_id },
        secret,
        {
          expiresIn: "15d",
        },
        (err, token) => {
          if (err) {
            res.status(500).send({ error: "Internal server error" });
          }
          res.send({ token: token, error: false });
        }
      );
    } else {
      res.send({ error: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CUSTOMER SIGN UP
app.post("/customersignup", async (req, res) => {
  try {
    const verifyDuplicacy = await CustomerModel.findOne({
      username: req.body.username,
      email: req.body.email,
      phoneno: req.body.phoneno,
    });
    if (verifyDuplicacy) {
      res.send("User Already Exists !!!");
    } else {
      const insertCustomerData = await CustomerModel.create({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        phoneno: req.body.phoneno,
        email: req.body.email,
        password: req.body.password,
      });
      if (insertCustomerData) {
        res.send({ message: "Successfully Inserted !!!" });
      } else {
        res.send({ message: "Unable to Insert Data !!!" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// MANAGER LOGIN PAGE
app.post("/managerlogin", async (req, res) => {
  try {
    const checkManager = await ManagerModel.findOne({
      mid: req.body.mid,
      password: req.body.password,
    });

    if (checkManager) {
      const token_id = checkManager._id;
      jwt.sign(
        { token_id },
        secret,
        {
          expiresIn: "15d",
        },
        (err, token) => {
          if (err) {
            res.status(500).send({ error: "Internal server error" });
          }
          res.send({ token: token });
        }
      );
    } else {
      res.send({ error: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET PRODUCTS PAGE
app.post("/getproduct", async (req, res) => {
  try {
    const products = await CustomerModel.find({});
    if (products) {
      res.send({ products });
    } else {
      res.send({ message: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// NEW PAGE

app.listen(8080, () => {
  console.log("Connected to 8080");
});
