// src/App.jsx
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useGames } from './hooks/useGames';
import Header from './components/layout/Header';
import GameList from './components/games/GameList';
import GameForm from './components/games/GameForm';
import GameDetail from './components/games/GameDetail';
import AuthForm from './components/auth/AuthForm';

function App() {
  const { user, login, register, logout } = useAuth();
  const { games, filters, setFilters, pagination, setPagination, fetchGames, addGame, updateGame, deleteGame } = useGames(user?.token);
  const [page, setPage] = useState('home');
  const [selectedGameId, setSelectedGameId] = useState(null);

  const renderPage = () => {
    switch (page) {
      case 'login': return <AuthForm type="login" onSubmit={login} />;
      case 'register': return <AuthForm type="register" onSubmit={register} />;
      case 'add': return <GameForm onSubmit={addGame} onCancel={() => setPage('home')} />;
      case 'edit':
        const game = games.find(g => g._id === selectedGameId);
        return <GameForm game={game} onSubmit={(data) => updateGame(selectedGameId, data)} onCancel={() => setPage('home')} />;
      case 'detail': return <GameDetail gameId={selectedGameId} onBack={() => setPage('home')} />;
      default:
        return (
          <GameList
            games={games}
            filters={filters}
            setFilters={setFilters}
            pagination={pagination}
            setPagination={setPagination}
            onAdd={() => setPage('add')}
            onEdit={setSelectedGameId}
            onDelete={deleteGame}
            onDetail={setSelectedGameId}
            setPage={setPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} setPage={setPage} />
      <main className="container mx-auto p-4">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;