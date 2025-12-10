const jwt = require("jsonwebtoken");
module.export = (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = user;
        next();
    } catch (err) {
        next(new Error("احراز هویت ناموفق"))
    }
}