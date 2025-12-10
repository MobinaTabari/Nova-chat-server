const Message = require("../Models/Message");
module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("اتصال جدید:", socket.user);      
        socket.on("chat message", async (data) => {
            if (!socket.user) return;
            const msg = new Message({
                userId: socket.user.id,
                role: socket.user.role,
                text: data.text
            });
            await msg.save();     

        io.emit("chat message", {
            user: {
                    id: socket.user.id,
                    role: socket.user.role
                },
            text: data.text
            });
        });     
        socket.on("disconnect", () => {
            console.log("قطع اتصال:", socket.user);
        });
    });
};