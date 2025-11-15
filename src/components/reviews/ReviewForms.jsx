// src/components/reviews/ReviewForm.jsx
import { useState } from 'react';
import Button from '../ui/Button';

export default function ReviewForm({ onSubmit, loading, error }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5); // Puntuación de 1 a 5

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("La reseña no puede estar vacía.");
      return;
    }
    onSubmit({ texto: text, puntuacion: rating });
    setText(''); // Limpiar el formulario después del envío
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">Añadir Reseña</h3>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        required
        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-indigo-500"
        placeholder="Escribe tu opinión sobre este juego..."
      />

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          <label htmlFor="rating" className="text-sm font-medium text-gray-700">Puntuación:</label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-16 p-1 border border-gray-300 rounded-md text-center"
          />
          <span className="text-gray-500">/ 5 estrellas</span>
        </div>
        
        <Button type="submit" loading={loading}>
          {loading ? 'Enviando...' : 'Publicar Reseña'}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}