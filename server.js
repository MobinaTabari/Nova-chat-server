require("dotenv").config();
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const connectDB = require("./Config/db")
const socketAuth = require("./Middleware/socketAuth");
const SocketHandler = require("./Socket/index");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors : { origin : ["http://localhost:5173", "http://localhost:3000"],credentials: true}
})

connectDB();
io.use(socketAuth);
SocketHandler(io);

server.listen(process.env.Port || 3001, () => {
    console.log(`server on port${process.env.PORT || 3001} run `)
});


