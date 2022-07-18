const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => {
  console.log("server listening to 3000");
});

const io = require("socket.io")(server);

io.on("connection", (client) => {
  console.log("connection");
  client.on("play", (data) => {
    const { currentSeekTime } = data;
    io.emit("play", { currentSeekTime });
  });
  client.on("pause", (data) => {
    io.emit("pause");
  });
  client.on("disconnect", () => {
    /* … */
  });
});

// console.log(io);

// io.listen(3000);
