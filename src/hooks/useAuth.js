// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) setUser({ username, token });
  }, []);

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await api.auth.login(data);
      if (!res.token) throw new Error(res.message);
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      setUser({ username: res.username, token: res.token });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await api.auth.register(data);
      if (!res.token) throw new Error(res.message);
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      setUser({ username: res.username, token: res.token });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return { user, login, register, logout, loading, error, setError };
};