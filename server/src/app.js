const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
let bcrypt = require('bcrypt');

var User = require("../models/users");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// DB Setup
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


app.post('/register', (req, res) => {


  let email = req.body.email;
  let password = req.body.password;

  bcrypt.hash(password, 10, function(err, hash) {
    let new_user = new User({
      email: email,
      password: hash
    })

    new_user.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.status(200).send({
        success: true,
        message: 'User saved successfully!'
      })
    })
  })
})

app.listen(process.env.PORT || 8081)
