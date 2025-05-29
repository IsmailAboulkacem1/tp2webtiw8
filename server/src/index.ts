  //import path from 'path' // Ajouté pour gérer les chemins de fichier

  //import { HelloRouteur } from './routes/hello.router';

 const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log("New client:", socket.id);

  socket.on("action", (action: any) => {
    console.log("Broadcasting action:", action);
    socket.broadcast.emit("action", action);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Socket.io server listening on port 3000");
});