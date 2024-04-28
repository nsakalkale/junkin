const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const CustomerModel = require("./models/Customers");
const ManagerModel = require("./models/Manager");
const bcrypt = require("bcrypt");
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
app.use(cors({ origin: "*" }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
  res.send("HI");
});

// // Get user route
// app.post("/getuser", async (req, res) => {
//   try {
//     // Your implementation
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Customer login route
// app.post("/customerlogin", async (req, res) => {
//   try {
//     const checkCustomer = await CustomerModel.findOne({
//       username: req.body.username,
//       password: req.body.password,
//     });

//     if (checkCustomer) {
//       const token_id = checkCustomer._id;
//       jwt.sign(
//         { token_id },
//         secret,
//         {
//           expiresIn: "15d",
//         },
//         (err, token) => {
//           if (err) {
//             console.error(err); // Log the error for debugging purposes
//             res.status(500).json({ error: "Internal server error" });
//           } else {
//             res.json({ token: token, error: false });
//           }
//         }
//       );
//     } else {
//       res.json({ error: true });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Customer signup route
// app.post("/customersignup", async (req, res) => {
//   try {
//     // Your implementation
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Manager login route
// app.post("/managerlogin", async (req, res) => {
//   try {
//     // Your implementation
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Get products route
// app.post("/getproduct", async (req, res) => {
//   try {
//     // Your implementation
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Listen on port 8080
app.listen(8080, () => {
  console.log("Connected to 8080");
});
