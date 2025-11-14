// src/components/games/GameFilters.jsx
import { useState } from 'react';  // 
import { Search } from 'lucide-react';

export default function GameFilters({ filters, setFilters }) {
  const [local, setLocal] = useState(filters);

  const handleChange = (e) => {
    setLocal(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(local);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl mb-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center space-x-2">
        <Search size={20} />
        <span>Buscar y Filtrar</span>
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <input name="titulo" value={local.titulo} onChange={handleChange} placeholder="Título" className="input" />
        <input name="genero" value={local.genero} onChange={handleChange} placeholder="Género" className="input" />
        <select name="completado" value={local.completado} onChange={handleChange} className="input">
          <option value="">Todos</option>
          <option value="true">Completado</option>
          <option value="false">Pendiente</option>
        </select>
        <button type="submit" className="btn btn-primary">
          <Search size={18} className="mr-2" /> Aplicar
        </button>
      </form>
    </div>
  );
}