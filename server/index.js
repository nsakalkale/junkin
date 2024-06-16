const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const CustomerModel = require("./models/Customers");
const ManagerModel = require("./models/Manager");
const ProductModel = require("./models/Product");
const OrderModel = require("./models/Orders");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const secret = process.env.SECRET;

// Connect to MongoDB
const mongo_url = process.env.MONGODB_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Express middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests only from this origin
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Home route
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

// Customer login route
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
            console.error(err); // Log the error for debugging purposes
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.json({ token: token, error: false });
          }
        }
      );
    } else {
      res.json({ error: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Customer signup route
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
app.get("/getproduct", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    if (products.length > 0) {
      res.send({ products });
    } else {
      res.status(404).send({ message: "No products found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//ORDER INSERTION
app.post("/orderentry", async (req, res) => {
  try {
    const insertOrderData = await OrderModel.create({
      custid: req.body.custid,
      orderid: req.body.orderid,
      orderdate: req.body.orderdate,
      orderstatus: req.body.orderstatus,
      ordertotal: req.body.ordertotal,
      orderitems: req.body.orderitems,
      txnid: req.body.txnid,
      paymentstatus: req.body.paymentstatus,
    });
    if (insertOrderData) {
      res.send({ message: "Successfully Inserted !!!" });
    } else {
      res.send({ message: "Unable to Insert Data !!!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//INSERT PRODUCTS
app.post("/addproducts", async (req, res) => {
  try {
    const insertProduct = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img_url: req.body.img_url,
      type: req.body.type,
      vnvg: req.body.vnvg,
    });
    if (insertProduct) {
      res.status(201).send({ message: "Product added successfully" });
    } else {
      res.status(404).send({ message: "Unable to add product" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Listen on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
