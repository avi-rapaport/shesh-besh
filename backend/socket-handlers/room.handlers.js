import { roomsRepo } from '../socket-repository/room.repo.js';

export function roomHandlers(socket, io) {
  socket.on('room:create', async ({ name }, callback) => {
    try {
      const result = await roomsRepo.createRoom(socket, name);
      return callback(result);
    } catch (error) {
      console.error(error.message);
      callback({ success: false, error: error.message });
    }
  });

  socket.on('room:join', async (data, callback) => {
    try {
      const { roomCode } = data;
      const { result, roomState } = await roomsRepo.joinRoom(socket, data);
      callback(result);

      io.to(roomCode).emit('room:state', { roomState });
    } catch (error) {
      console.error(error.message);
      callback({ success: false, error: error.message });
    }
  });
}
