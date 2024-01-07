require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io")
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",messagesRoutes);



(async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/chatapp`);
        console.log(`\n Database connected !! DB_HOST : ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.error("MONGODB connection FAILED :", error);
        process.exit(1);
    }
})()

const server = app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ${process.env.PORT}`);
})
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});