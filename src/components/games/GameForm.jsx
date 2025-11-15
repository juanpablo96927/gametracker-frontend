// src/components/games/GameForm.jsx
import { useState } from 'react';
import Button from '../ui/Button';
// Asegúrate de que este archivo exista y contenga los valores por defecto
import { initialGameData } from '../../utils/constants'; 

export default function GameForm({ game, onSubmit, loading, onCancel }) {
  // Inicializa con los datos del juego si es edición, o con datos iniciales si es creación
  const [formData, setFormData] = useState(game || initialGameData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      // Maneja booleanos (checkbox), números (number) y texto (string)
      [name]: type === 'checkbox' ? checked : (type === 'number' ? +value : value)
    }));
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
    // Llama a la función addGame o updateGame del useGames hook
    const success = await onSubmit(formData);
    if (success) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {game ? 'Editar Juego' : 'Añadir Nuevo Juego'}
      </h2>
      
      {/* ======================= CAMPOS PRINCIPALES ======================= */}
      <input
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Título del Juego (Requerido)"
      />

      <input
        name="genero"
        value={formData.genero}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md"
        placeholder="Género (Ej: RPG, Acción, Estrategia)"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="plataforma"
          value={formData.plataforma}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md"
          placeholder="Plataforma (Ej: PC, PS5, Switch)"
        />

        <input
          name="anioLanzamiento"
          type="number"
          value={formData.anioLanzamiento || ''}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md"
          placeholder="Año de Lanzamiento"
        />
      </div>

      <input
        name="desarrollador"
        value={formData.desarrollador}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md"
        placeholder="Desarrollador"
      />
      
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        rows="3"
        className="w-full p-3 border border-gray-300 rounded-md resize-none"
        placeholder="Descripción o Resumen del juego"
      />

      <input
        name="portada"
        value={formData.portada}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md"
        placeholder="URL de la Portada"
      />

      {/* ======================= ESTADO Y PUNTUACIÓN ======================= */}
      <div className="grid grid-cols-3 gap-4 items-center border-t pt-4">
        <label className="flex items-center space-x-2">
          <input
            name="completado"
            type="checkbox"
            checked={formData.completado}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-indigo-600 rounded"
          />
          <span className="text-gray-700">Completado</span>
        </label>

        <div>
          <label htmlFor="puntuacion" className="block text-sm font-medium text-gray-700 mb-1">Puntuación (0-5)</label>
          <input
            name="puntuacion"
            type="number"
            min="0"
            max="5"
            value={formData.puntuacion || 0}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="horasJugadas" className="block text-sm font-medium text-gray-700 mb-1">Horas Jugadas</label>
          <input
            name="horasJugadas"
            type="number"
            min="0"
            value={formData.horasJugadas || 0}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      {/* ======================= BOTONES ======================= */}
      <div className="flex gap-4 pt-4 border-t">
        <Button type="button" onClick={onCancel} variant="secondary">Cancelar</Button>
        <Button type="submit" loading={loading} variant="primary">
          {game ? 'Guardar Cambios' : 'Crear Juego'}
        </Button>
      </div>
    </form>
  );
}