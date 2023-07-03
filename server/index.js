import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Authroutes from "./routes/AuthRoutes.js";
import MessageRoute from "./routes/MessageRoutes.js";
import { Server, Socket } from "socket.io";

dotenv.config();

const PORT = process.env.BACKEND_PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", Authroutes);
app.use("/api/message", MessageRoute);

const server = app.listen(PORT, () => {
  console.log(`Server successfully listen on port: ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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
    sendUserSocket &&
      socket.to(sendUserSocket).emit("msg-recieve", {
        from: data.from,
        message: data.message,
      });
  });
});
