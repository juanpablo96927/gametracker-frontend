// src/components/layout/Header.jsx
import { LogOut, LogIn, UserPlus } from 'lucide-react';

export default function Header({ user, logout, setPage }) {
  return (
    <header className="bg-indigo-700 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          onClick={() => setPage('home')}
          className="text-3xl font-bold text-white cursor-pointer hover:text-indigo-200 transition"
        >
          GameTracker
        </h1>

        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white text-sm md:text-base hidden sm:block">
                Hola, {user.username}
              </span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setPage('login')}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
              <button
                onClick={() => setPage('register')}
                className="hidden sm:flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                <UserPlus size={18} />
                <span>Registro</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}