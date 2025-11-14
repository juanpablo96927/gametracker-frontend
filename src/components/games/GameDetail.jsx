// src/components/games/GameDetail.jsx
import { useState, useEffect } from 'react';
import { Loader, AlertTriangle, ArrowLeft } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api';

export default function GameDetail({ gameId, onBack }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/juegos/${gameId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al cargar el juego');
        setGame(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) fetchGame();
  }, [gameId]);

  const imageError = "https://placehold.co/800x450/1e293b/ffffff?text=Portada+No+Disponible";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader className="animate-spin text-indigo-600" size={32} />
        <p className="ml-2 text-indigo-600">Cargando detalles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 bg-red-100 rounded-xl shadow-lg border border-red-300">
        <p className="text-xl font-semibold text-red-700 flex items-center justify-center">
          <AlertTriangle size={24} className="mr-2" /> Error: {error}
        </p>
        <button onClick={onBack} className="mt-4 text-indigo-600 hover:text-indigo-800 transition">
          Volver al Listado
        </button>
      </div>
    );
  }

  if (!game) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition font-medium"
      >
        <ArrowLeft size={20} />
        <span>Volver al Listado</span>
      </button>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Portada */}
        <div className="relative h-64 bg-gray-900">
          <img
            src={game.portada || imageError}
            alt={`Portada de ${game.titulo}`}
            className="w-full h-full object-cover opacity-70"
            onError={(e) => { e.target.src = imageError; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent p-6 flex items-end">
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              {game.titulo} ({game.aniolanzamiento})
            </h1>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium text-gray-700 border-b pb-4">
            <div>
              <p className="text-xs text-gray-500">Género</p>
              <p className="text-indigo-600">{game.genero || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Plataforma</p>
              <p className="text-indigo-600">{game.plataforma || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Desarrollador</p>
              <p>{game.desarrollador || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Estado</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${game.completado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {game.completado ? 'Completado' : 'Pendiente'}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
            {game.descripcion || 'No hay descripción disponible.'}
          </p>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Horas jugadas: <strong>{game.horasJugadas}</strong></span>
          </div>
        </div>

        {/* Reseñas (placeholder) */}
        <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Reseñas</h3>
          <div className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm">
            <p>Funcionalidad de reseñas pendiente de implementar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}