// src/components/games/GameList.jsx (Código FINAL y Corregido)
import GameCard from './GameCard';
import GameFilters from './GameFilters';
import { Loader } from 'lucide-react';

export default function GameList({
  games,
  filters,
  setFilters,
  pagination,
  setPagination,
  loading,
  error,
  onAdd,
  onEdit,
  onDelete,
  onDetail,
  setPage, // <--- setPage ha sido restaurado aquí
}) {
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = Math.floor(pagination.skip / pagination.limit) + 1;

  const goToPage = (page) => {
    const newSkip = (page - 1) * pagination.limit;
    if (newSkip >= 0 && newSkip < pagination.total) { 
      setPagination(prev => ({ ...prev, skip: newSkip }));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">Mi Colección de Juegos</h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300"
        >
          <span className="text-xl">Add</span>
          <span>Añadir Juego</span>
        </button>
      </div>

      <GameFilters filters={filters} setFilters={setFilters} />

      {error && (
        <p className="text-red-600 text-lg p-4 bg-red-100 rounded-xl border border-red-300 my-4">
          Error: {error}
        </p>
      )}

      {loading && (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin text-indigo-600" size={32} />
          <p className="ml-2 text-indigo-600">Cargando juegos...</p>
        </div>
      )}

      {!loading && games.length === 0 && !error && (
        <div className="p-10 bg-gray-100 rounded-xl text-center text-gray-500">
          <p className="text-xl font-semibold">No se encontraron juegos.</p>
          <p className="mt-2">Intenta ajustar los filtros.</p>
        </div>
      )}

      {/* Único bloque de renderizado con la lista y paginación */}
      {!loading && games.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map(game => (
              <GameCard
                key={game._id}
                game={game}
                onEdit={() => onEdit(game._id)}
                onDelete={() => onDelete(game._id)}
                onDetail={() => onDetail(game._id)}
                setPage={setPage} // <--- RESTAURADO para que funcione la navegación en GameCard
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-3 mt-8">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Anterior
              </button>
              <span className="text-gray-700 font-semibold">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}