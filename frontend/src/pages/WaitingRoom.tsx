import { useParams } from 'react-router-dom';

const WaitingRoom = () => {
  const { roomcode } = useParams();
  return (
    <div>
      <h1>Welcome to Shesh Besh game</h1>
      <h3>Room code: {roomcode}</h3>
    </div>
  );
};

export default WaitingRoom;
