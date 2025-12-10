const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userId : String,
    role : String,
    text : String,
    createAt : {type : Date, default: Date.now}
});

module.exports = mongoose.model("Message", messageSchema)