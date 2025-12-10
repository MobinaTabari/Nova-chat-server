const Message = require("../Models/Message");
module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("اتصال جدید :" , socket.user);
        socket.on("chat massage", async(text) => {
            const msg = new Message({
                userId : socket.user.id,
                role : socket.user.role,
                text
            });
            await msg.save();
            io.emit("chat massage", {user: socket.user})
        });
        socket.on("disconnect", () => {
            console.log("قطع اتصال", socket.user);
        });
    });
};