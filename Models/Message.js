const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema({
    userId : String,
    role : String,
    text : String,
    createAdt : {type : Date, default: Date.now}
});

module.exports = mongoose.model("Message", massageSchema)