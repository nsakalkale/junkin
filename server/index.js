// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const CustomerModel = require("./models/Customers");
// const ManagerModel = require("./models/Manager");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// require("dotenv").config();
// const app = express();

// // CORS middleware function
// const allowCors = (fn) => async (req, res) => {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );
//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }
//   return await fn(req, res);
// };

// // Handler function for main endpoint
// const handler = (req, res) => {
//   const d = new Date();
//   res.end(d.toString());
// };

// // Connect to MongoDB
// const mongo_url = process.env.MONGODB_URL;
// mongoose
//   .connect(mongo_url)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Express middleware
// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use(allowCors);

// // Home route
// app.get("/", (req, res) => {
//   res.send("HI");
// });

// // Get user route
// app.post("/getuser", async (req, res) => {
//   try {
//     // Your implementation
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Customer login route
// app.post("/customerlogin", async (req, res) => {
//   try {
//     // Your implementation
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

// // Listen on port 8080
// app.listen(8080, () => {
//   console.log("Connected to 8080");
// });

const express = require("express");
const app = express();
const PORT = 8080;

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
