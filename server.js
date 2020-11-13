require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const routes = require("./routes");
const constants = require("./constants");

const corsOptions = {
    origin: ["http://settlers-of-deere.surge.sh"],
    // origin: ['http://localhost:3000'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true, //allows session cookies to be sent back and forth
    optionsSuccessStatus: 200 //legacy browsers
  }

const verifyToken = (req, res, next) => {
  let token =  req.headers["authorization"];

  if(token){
    token = token.substring(constants.BEARER_START_INDEX);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if(err || !decodedUser){
      return res.status(constants.UNAUTHORIZED).send(`ERROR: ${err}`);
    }
  })
}

`app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});`
app.options("*", cors(corsOptions))
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use('/auth', routes.auth);
app.use('/user',  routes.user); //ToDo: add Verify Token Midstep
app.use("/profile", routes.profile);
//ToDo: Figure out where to route leaderboard

app.listen(process.env.PORT, () => {
    console.log(`Habemus connexion ad portum ${process.env.PORT}`)
})