// src/App.jsx (CORREGIDO)
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
  // La desestructuración aquí es correcta:
  const { games, filters, setFilters, pagination, setPagination, fetchGames, addGame, updateGame, deleteGame, addReview } = useGames(user?.token);
  const [page, setPage] = useState('home');
  const [selectedGameId, setSelectedGameId] = useState(null);

  const renderPage = () => {
    switch (page) {
    case 'login': return <AuthForm type="login" onSubmit={login} setPage={setPage} />;
      case 'register': return <AuthForm type="register" onSubmit={register} setPage={setPage} />;
      case 'add': return <GameForm onSubmit={addGame} onCancel={() => setPage('home')} />;
      case 'edit':
        const game = games.find(g => g._id === selectedGameId);
        return <GameForm game={game} onSubmit={(data) => updateGame(selectedGameId, data)} onCancel={() => setPage('home')} />;
      
      // ✅ CASO 'detail' ÚNICO Y CORREGIDO
      case 'detail': 
        return (
          <GameDetail 
            gameId={selectedGameId} 
            onBack={() => setPage('home')} 
            addReview={addReview} // <-- Ahora solo se ejecuta este bloque
          />
        );
      
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
      <Header user={user} logout={logout} setPage={setPage} />
      <main className="container mx-auto p-4">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;