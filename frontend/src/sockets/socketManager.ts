import { io } from 'socket.io-client';
import type { createRoomResult, joinRoomResult } from '../types';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('socket connect successfully', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('❌ connection error', error);
});

const createRoom = (
  name: string,
  callback: (response: createRoomResult) => void
) => {
  socket.emit('room:create', { name }, callback);
};

const joinRoom = (
  roomCode: string,
  name: string,
  callback: (response: joinRoomResult) => void
) => {
  socket.emit('room:join', { roomCode, name }, callback);
};

export const socketManager = { createRoom, joinRoom };
