const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require("cors");
const dbConfig = require("./config/db.config.js");
const mongoose = require('mongoose')
const path = require('path')


const app = express();
const server = require("http").Server(app)
const socketio = require("socket.io");
dotenv.config();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 4000;
app.set("port", port);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("\nDB Connected...");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

require("./routers/transaction.router.js")(app);
app.use(express.static('Client/public'))
// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RFID Panel Control" });
});


var io = socketio(server)

/*socket connection*/
io.on('connection', function (socket) {
  socket.emit('NEW_SOCKET', { message: 'A new user has joined!' });
  console.log("new socket connected")
});

app.get("/new-transaction", (req, res) => {
  const body = req.body;
  //save the transaction data
  io.emit("NEW_TRANSACTION", { transaction: body, message: "new transaction", success: true })
  return res.send()
})

server.listen(4000, () => {
  console.log(`Ctrl+Click to open: http://localhost:4000`);
});