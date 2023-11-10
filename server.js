const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

let connectToDB = async () => {
  try {
    await mongoose.connect(process.env.mdburl);
    console.log("Connected to MDB successfully");
  } catch (err) {
    console.log("Unable to connect to MDB");
  }
};

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

// create a write stream (in append mode)
// let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
//   flags: "a",
// });

// // setup the logger
// app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.urlencoded());

let middlewareFn = (req, res, next) => {
  console.log("inside middleware fn 1");
  next();
};

let middlewareFn2 = (req, res, next) => {
  console.log("inside middleware fn 2");
  next();
};

let authoriseUser = (req, res, next) => {
  console.log("authoriseuser");
  console.log(req.headers.authorization);
  next();
};

app.use(authoriseUser);

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log("received data");
  console.log(req.body);
  console.log(req.file);

  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      profilePic: req.file.path,
    });

    let userData = await User.find().and({ email: req.body.email });

    if (userData.length > 0) {
      res.json({ status: "failure", msg: "user account already exists" });
    } else {
      await User.insertMany([newUser]);
      console.log("user created successfully");
      res.json({ status: "success", msg: "user created successfully" });
    }
  } catch (err) {
    console.log("Unable to insert user into db");
    console.log(err);
    res.json({ status: "failure", msg: "Unable to create user" });
  }
});

app.post("/validateLogin", upload.none(), async (req, res) => {
  console.log(req.body);

  let userData = await User.find().and({ email: req.body.email });

  if (userData.length > 0) {
    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userData[0].password
    );
    if (isPasswordCorrect == true) {
      let encryptedCredentials = jwt.sign(
        { email: userData[0].email, password: userData[0].password },
        "SKJ"
      );

      console.log(encryptedCredentials);

      res.json({
        status: "success",
        data: userData,
        token: encryptedCredentials,
      });
    } else {
      res.json({ status: "failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "Invalid Username" });
  }
});

app.post("/validateToken", upload.none(), async (req, res) => {
  console.log(req.body);

  try {
    let decryptedCredentials = jwt.verify(req.body.token, "SKJ");

    console.log(decryptedCredentials);

    let userDetails = await User.find().and({
      email: decryptedCredentials.email,
    });

    console.log(userDetails);
    if (userDetails.length > 0) {
      if (userDetails[0].password == decryptedCredentials.password) {
        res.json({ status: "success", data: userDetails });
      } else {
        res.json({ status: "failure", msg: "Invalid Password" });
      }
    } else {
      res.json({ status: "failure", msg: "Invalid Token" });
    }
  } catch (err) {
    res.json({ status: "failure", msg: "Invalid Token" });
  }
});

app.put("/editProfile", upload.single("profilePic"), async (req, res) => {
  try {
    if (req.body.firstName.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        {
          firstName: req.body.firstName,
        }
      );
    }

    if (req.body.lastName.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        {
          lastName: req.body.lastName,
        }
      );
    }

    if (req.body.age.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        {
          age: req.body.age,
        }
      );
    }

    if (req.body.password.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        {
          password: req.body.password,
        }
      );
    }

    if (req.file.path.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        {
          profilePic: req.file.path,
        }
      );
    }

    // await User.updateMany(
    //   { email: req.body.email },
    //   {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     age: req.body.age,
    //     password: req.body.password,
    //     profilePic: req.file.path,
    //   }
    // );

    res.json({ status: "success", msg: "User details updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "failure", msg: "Unable to update details" });
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    await User.deleteMany({ email: req.query.email });
    res.json({ status: "success", msg: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "failure", msg: "Unable to delete user" });
  }
});

app.listen(process.env.port, () => {
  console.log("Listening to port 5678");
});

connectToDB();
