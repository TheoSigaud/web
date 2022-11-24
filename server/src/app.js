const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()
app.use(bodyParser.json())
app.use(cors())


let DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}/posts`, { useNewUrlParser: true });

let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function(callback){
  console.log("Connection Succeeded");
});


app.get('/test', (req, res) => {
  console.log(req.body.title)
  res.status(200).send({ message: 'Working' });
});

app.listen(8081)
