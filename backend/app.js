import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setIo, socketsHandlers } from './handlers/room.handlers';

const app = express();
app.use(cors());
const httpServer = http.createServer(app);

export const rooms = new Map();

const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173', credentials: true },
});

io.on('connection', (socket) => {
  console.log(`player connected ${socket.id}`);

  socket.on('room:create', (name, callback) => {
    socketsHandlers.handleCreateRoom(socket, name, callback);
  });

  socket.on('room:join', (data, callback) => {
    const { roomCode, name } = data;
    socketsHandlers.handleJoinRoom(socket, roomCode, name, callback);
  });

  socket.on('disconnect', (reason) => {
    console.log(`player id ${socket.id} disconnected: ${reason}`);
  });
});

httpServer.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});
