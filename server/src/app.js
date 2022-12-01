const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const auth = require("./middleware/auth");
require("dotenv").config();


let User = require("../models/users");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

let mongoose = require('mongoose');

let DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}/web`, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', function (error) {
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/posts`, { useNewUrlParser: true }).catch(() => {
      });
    }, 20 * 1000);
  } else {
    console.error(new Date(), String(error));
  }
});

db.once("open", function(callback){
  console.log("Connection Succeeded");
});


app.post('/register', async (req, res) => {

  try {
    const {email, password} = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({email});

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email.toLowerCase().trim(),
      password: encryptedPassword,
    });

    res.status(201).send({
      message: 'User saved successfully!'
    });
  } catch (err) {
    console.log(err);
  }
})

app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
          {user_id: user._id, email},
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
      );

      const response = {
        'id': user._id,
        'email': user.email,
        'token': token
      }

      res.status(200).json(response);
    }else{
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 8081)
