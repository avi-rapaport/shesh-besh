import crypto from 'crypto';
import { rooms } from './rooms';

async function createRoom(socket, name) {
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 20) {
    throw new Error('Invalid name');
  }

  if (socket.roomCode) {
    throw new Error('Socket already has a room!');
  }

  const random = crypto.randomUUID();
  const roomCode = random.slice(0, 6);
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

  return { success: true, roomCode };
}

async function joinRoom(socket, data) {
  const { roomCode, name } = data;

  if (typeof name !== 'string' || !name.trim() || name.trim().length > 20) {
    throw new Error('Invalid name');
  }

  const room = rooms.get(roomCode);
  if (!room) {
    throw new Error('Room not found!');
  }

  if (room.status !== 'waiting') {
    throw new Error('Room status not suitable for joining!');
  }

  if (room.players.length === 2) {
    throw new Error('Room alredy full!');
  }

  if (socket.roomCode) {
    throw new Error('Socket already has a room!');
  }

  await socket.join(roomCode);
  socket.roomCode = roomCode;

  room.players.push({ socketId: socket.id, name, color: 'black' });

  const roomState = {
    status: 'waiting',
    players: [
      { name: room.players[0].name, color: 'white' },
      { name, color: 'black' },
    ],
  };

  return { result: { success: true, roomCode }, roomState };
}

export const roomsRepo = {
  createRoom,
  joinRoom,
};
