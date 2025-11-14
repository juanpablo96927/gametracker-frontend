// src/components/games/GameCard.jsx
import { Edit, Trash2 } from 'lucide-react';

const imageError = "https://placehold.co/400x600/6b21a8/ffffff?text=Portada+No+Disponible";

export default function GameCard({ game, onEdit, onDelete, onDetail }) {
  return (
    <div
      onClick={onDetail}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-100 cursor-pointer"
    >
      <div className="relative h-48">
        <img
          src={game.portada || imageError}
          alt={game.titulo}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = imageError; }}
        />
        <div className={`absolute top-0 right-0 p-2 text-xs font-bold text-white rounded-bl-lg ${game.completado ? 'bg-green-600' : 'bg-yellow-600'}`}>
          {game.completado ? 'Completado' : 'Pendiente'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 truncate mb-1" title={game.titulo}>
          {game.titulo} ({game.aniolanzamiento})
        </h3>
        <p className="text-sm text-indigo-600 font-medium mb-3">
          {game.genero} | {game.plataforma}
        </p>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4">{game.descripcion}</p>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-700 p-4 pt-0">
        <span>Horas: <span className='font-semibold'>{game.horasJugadas}</span></span>
        <div className="flex space-x-2">
          <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="text-indigo-500 hover:text-indigo-700">
            <Edit size={18} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-500 hover:text-red-700">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}