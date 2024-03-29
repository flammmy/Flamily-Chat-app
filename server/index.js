require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const {Server} = require("socket.io");
const app = express();
const fs = require('fs');
const http = require('http');
const path = require('path');

app.use(cors());
app.use(express.json());

const options = {
  key : fs.readFileSync(path.join(__dirname,'cert','key.pem')),
  cert : fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
}
const server = http.createServer(options,app);

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

;(async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/chatapp`
    );
    console.log(
      `\n Database connected !! DB_HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection FAILED :", error);
    process.exit(1);
  }
})();



server.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    io.emit("user-online",userId);
    onlineUsers.set(userId, socket.id);
  });
  socket.on("disconnect", () => {
    for (const [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        const userId = key;
        onlineUsers.delete(userId);
        socket.broadcast.emit("user-offline", userId);
        break;
      }
    }
    
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
