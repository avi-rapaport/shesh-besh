import { Server } from 'socket.io';
import { httpServer } from './app.js';
import { roomHandlers } from './socket-handlers/room.handlers.js';

const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173', credentials: true },
});

io.on('connection', (socket) => {
  console.log(`player connected ${socket.id}`);

  roomHandlers(socket, io);

  socket.on('disconnect', (reason) => {
    console.log(`player id ${socket.id} disconnected: ${reason}`);
  });
});
