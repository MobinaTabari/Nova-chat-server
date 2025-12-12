require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    methods: ["GET", "POST"],
}));
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:5173"], 
        methods: ["GET", "POST"],
        credentials: true,
    },
});



app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(" MongoDB connection error:", err));


const MessageSchema = new mongoose.Schema({
  user: {
    role: String,
  },
  text: String,
  time: String,
});

const Message = mongoose.model("Message", MessageSchema);

app.get("/messages", async (req, res) => {
    try {
        const messages = await Message.find({});
        res.json(messages);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Server error" });
    }
});

io.on("connection", (socket) => {
    console.log(" New client connected:", socket.id);

    socket.on("chat message", async(msg) => {
    const formatted = typeof msg === "string"? 
    { user: { role: "admin" }, text: msg, time: new Date().toLocaleTimeString() }
    : msg;  
    try{
        const saved = await Message.create(formatted);
        io.emit("chat message", saved);
    } catch(err){
        console.log("Error saving :", err)
    }    
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// const PORT = process.env.PORT || 3001;
server.listen(3001, () => {
    console.log("Server running on port 3001");
});