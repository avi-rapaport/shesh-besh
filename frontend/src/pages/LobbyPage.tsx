import { useState } from 'react';
import { socketManager } from '../sockets/socketManager';
import { useNavigate } from 'react-router-dom';

const LobbyPage = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleCreateRoom = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('1');
    socketManager.createRoom(name, (response) => {
      console.log('2');
      if (!response.success) {
        alert(response.error.message);
      } else {
        navigate(`/waiting-room/${response.roomCode}`);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleCreateRoom}>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
          autoFocus
          required
        />

        <button type="submit">Create Room</button>
      </form>
      <button>Join Room</button>
    </div>
  );
};

export default LobbyPage;
