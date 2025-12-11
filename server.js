require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"], 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(" New client connected:", socket.id);

  socket.on("chat message", (msg) => {
    const formatted = typeof msg === "string"
      ? { user: { role: "admin" }, text: msg, time: new Date().toLocaleTimeString() }
      : msg;
  
    io.emit("chat message", formatted);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});