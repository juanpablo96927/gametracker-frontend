// src/components/games/GameForm.jsx
import { useState } from 'react';
import Button from '../ui/Button';
import { initialGameData } from '../../utils/constants';

export default function GameForm({ game, onSubmit, loading, onCancel }) {
  const [formData, setFormData] = useState(game || initialGameData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? +value : value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      {/* Inputs aquí... */}
      <input name="titulo" value={formData.titulo} onChange={handleChange} required className="input" placeholder="Título" />
      {/* ... más campos ... */}
      <div className="flex gap-2">
        <Button type="button" onClick={onCancel} variant="secondary">Cancelar</Button>
        <Button type="submit" loading={loading}>
          {game ? 'Guardar Cambios' : 'Crear Juego'}
        </Button>
      </div>
    </form>
  );
}