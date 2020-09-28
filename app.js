const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const config = require("config");

const { addUser, removeUser, getUser, getUsersInChat } = require("./api");

const PORT = config.get("PORT");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("join", ({ nickname, chat }, callback) => {
    const { error, user } = addUser({ id: socket.id, nickname, chat });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `Hi, welcome to chat ${user.chat}`,
    });

    socket.broadcast.to(user.chat).emit("message", {
      user: "admin",
      text: `User ${user.nickname} joined this chat`,
    });

    socket.join(user.chat);

    io.to(user.chat).emit("roomData", {
      chat: user.chat,
      users: getUsersInChat(user.chat),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.chat).emit("message", { user: user.nickname, text: message });
    io.to(user.chat).emit("roomData", {
      chat: user.chat,
      users: getUsersInChat(user.chat),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.chat).emit("message", {
        user: "admin",
        text: `User ${user.nickname} has left the chat`,
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
