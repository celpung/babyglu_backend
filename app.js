require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");
var adminRouter = require("./routes/admin");
const http = require("http");
//const server = http.createServer(app);
//const { Server } = require("socket.io");
//const io = new Server(server);

const models = require("./models");

var app = express();

// var userLogin = [];
// io.on('connection', (socket) => {
//   //enter chat
//   socket.on('enterChat', function (data) {
//     const asd = userLogin.find(el => el.id === data.id);
//     if (!asd) {
//       userLogin.push(data);
//     }
//     socket.emit('online', userLogin);

//     socket.prependAny((eventName, ...args) => {
//       // ...
//     });
//   });
// });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://103.116.168.146"],
  })
);
// app.use(cors({ credentials: true, origin: "http://103.116.168.146:3001" }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);

//server.listen(3001, process.env.IP_ADDRESS, () => console.log(`Websocket running at ${process.env.IP_ADDRESS}:${process.env.PORT}`));
app.listen(process.env.PORT, process.env.IP_ADDRESS, () =>
  console.log(
    `Express running at ${process.env.IP_ADDRESS}:${process.env.PORT}`
  )
);

module.exports = app;
