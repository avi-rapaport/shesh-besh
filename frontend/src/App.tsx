import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LobbyPage from './pages/LobbyPage';
import WaitingRoom from './pages/WaitingRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/lobby" />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/waiting-room/:roomcode" element={<WaitingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
