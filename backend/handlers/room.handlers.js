import crypto from 'crypto';
import { rooms } from '../app';

export function socketsHandlers(io) {
  async function handleCreateRoom(socket, name, callback) {
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 20) {
      return callback({ success: false, error: { message: 'Invalid name' } });
    }

    if (socket.roomCode) {
      return callback({ error: 'Socket already has a room!' });
    }

    const randomId = crypto.randomUUID();
    const roomCode = randomId.slice(0, 6);
    await socket.join(roomCode);
    socket.roomCode = roomCode;

    const room = {
      id: roomCode,
      status: 'waiting',
      ownerSocketId: socket.id,
      players: [{ socketId: socket.id, name, color: 'white' }],
      game: null,
      rematchAcceptedBy: [],
    };

    rooms.set(roomCode, room);

    return callback({ success: true, room, yourColor: 'white' });
  }

  function handleJoinRoom(socket, roomCode, name, callback) {
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 20) {
      return callback({ success: false, error: { message: 'Invalid name' } });
    }

    const room = rooms.get(roomCode);
    if (!room) {
      return callback({ error: 'Room not found!' });
    }

    if (room.status !== 'waiting') {
      return callback({ error: 'Room status not suitable for joining!' });
    }

    if (room.players.length === 2) {
      return callback({ error: 'Room alredy full!' });
    }

    if (socket.roomCode) {
      return callback({ error: 'Socket already has a room!' });
    }

    room.players.push({ socketId: socket.id, name, collor: 'black' });

    const roomState = {};

    callback({ success: true });
  }

  return { handleCreateRoom, handleJoinRoom };
}
