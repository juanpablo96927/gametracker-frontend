// src/services/api.js
const API_BASE = 'http://localhost:3000/api';

const api = {
  auth: {
    login: (data) => fetch(`${API_BASE}/usuarios/login`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
    register: (data) => fetch(`${API_BASE}/usuarios/register`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  },
  games: {
    getAll: (params) => fetch(`${API_BASE}/juegos?${new URLSearchParams(params)}`).then(r => r.json()),
    getById: (id) => fetch(`${API_BASE}/juegos/${id}`).then(r => r.json()),
    create: (data, token) => fetch(`${API_BASE}/juegos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id, data, token) => fetch(`${API_BASE}/juegos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id, token) => fetch(`${API_BASE}/juegos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json()),
  }
};

export default api;