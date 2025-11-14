// src/hooks/useGames.js
import { useState, useEffect, useCallback } from 'react';

export const useGames = (token) => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({ titulo: '', genero: '', completado: '' });
  const [pagination, setPagination] = useState({ limit: 10, skip: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGames = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...filters, limit: pagination.limit, skip: pagination.skip });
      const res = await fetch(`http://localhost:3000/api/juegos?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al cargar juegos');
      setGames(data.juegos || []);
      setPagination(prev => ({ ...prev, total: data.total || 0 }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, filters, pagination.limit, pagination.skip]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const addGame = async (data) => {
    try {
      await fetch('http://localhost:3000/api/juegos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      fetchGames();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateGame = async (id, data) => {  // ← ¡FALTA ESTA FUNCIÓN!
    try {
      await fetch(`http://localhost:3000/api/juegos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      fetchGames();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteGame = async (id) => {
    if (!confirm("¿Eliminar este juego?")) return;
    try {
      await fetch(`http://localhost:3000/api/juegos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGames();
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    games,
    filters,
    setFilters,
    pagination,
    setPagination,
    loading,
    error,
    addGame,
    updateGame,  // ← ¡AÑADE ESTO!
    deleteGame,
    fetchGames
  };
};