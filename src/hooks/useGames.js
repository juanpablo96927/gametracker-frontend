import { useState, useEffect, useCallback } from 'react';

// URL Base de tu API, confirmada en el puerto 3000
const API_BASE_URL = 'http://localhost:3000/api/juegos';

export const useGames = (token) => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({ titulo: '', genero: '', completado: '' });
  const [pagination, setPagination] = useState({ limit: 10, skip: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función de carga que usa useCallback para memoizar
  const fetchGames = useCallback(async () => {
    // Si no hay token, salimos inmediatamente
    if (!token) return; 
    
    setLoading(true);
    setError(null); // Limpiamos errores anteriores
    
    try {
      const params = new URLSearchParams({ ...filters, limit: pagination.limit, skip: pagination.skip });
      
      const res = await fetch(`${API_BASE_URL}?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await res.json();
      
      // Manejo de errores de respuesta (4xx, 5xx)
      if (!res.ok) throw new Error(data.message || 'Error al cargar juegos');
      
      // ✅ Solución anti-duplicación: Reemplazamos el array, no acumulamos
      setGames(data.juegos || []);
      setPagination(prev => ({ ...prev, total: data.total || 0 }));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, filters, pagination.limit, pagination.skip]);

  // Se ejecuta al montar y cuando cambian las dependencias (filtros, paginación, token)
  useEffect(() => {
    // Si la duplicación persiste, es causado por React Strict Mode, 
    // pero la lógica es correcta para el entorno de producción.
    fetchGames();
  }, [fetchGames]);

  // ------------------------- CRUD Operations -------------------------

  // src/hooks/useGames.js

const addGame = async (data) => {
    setLoading(true); 
    setError(null);
    
    try {
      const res = await fetch(API_BASE_URL, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data)
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.message || 'Fallo al crear juego');
      }

      // ✅ CAMBIO CRUCIAL: Añade el juego devuelto por el servidor al estado local
      //    Esto evita cualquier llamado a fetchGames() que pueda duplicar datos.
      setGames(prevGames => [resData, ...prevGames]); 
      
      return true; // Éxito
      
    } catch (err) {
      console.error("Error al crear juego:", err);
      setError(err.message);
      return false; // Fallo
    } finally {
      setLoading(false);
    }
};

  const updateGame = async (id, data) => {
    setLoading(true); 
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || 'Fallo al actualizar juego');
      }

      fetchGames();
      return true;
    } catch (err) {
      console.error("Error al actualizar juego:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

 const deleteGame = async (id) => {
  
    if (!confirm("¿Eliminar este juego?")) return;
    
    setLoading(true); 
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
         // Si el servidor devuelve 401 o 403, este error se capturará
         throw new Error(`Fallo al eliminar: ${res.statusText}`);
      }
      
   
      setGames(prevGames => prevGames.filter(game => game._id !== id));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // src/hooks/useGames.js

// ... (resto de funciones) ...

  const addReview = async (gameId, reviewData) => {
    if (!token) {
        setError('Debes iniciar sesión para añadir una reseña.');
        return false;
    }
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/juegos/${gameId}/reviews`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(reviewData)
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.message || 'Error al añadir reseña.');
      }

      // 💡 Opcional: Podrías necesitar recargar la lista de juegos o la información detallada
      // para mostrar la nueva reseña inmediatamente.
      // fetchGames(); 
      
      setLoading(false);
      return true;
      
    } catch (err) {
      console.error("Error al añadir reseña:", err);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };


  // ------------------------- Return Value -------------------------

  return {
    addReview,
    games,
    filters,
    setFilters,
    pagination,
    setPagination,
    loading,
    error,
    addGame,
    updateGame,  // <--- ¡Asegurado de estar incluido!
    deleteGame,
    fetchGames
  };
};