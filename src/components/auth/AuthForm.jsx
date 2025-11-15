// src/components/auth/AuthForm.jsx
import { LogIn, UserPlus, Loader } from 'lucide-react';
import Button from '../ui/Button';

export default function AuthForm({ type, onSubmit, loading, error, setPage }) { 
  const isLogin = type === 'login';

  // 2. Haz que handleSubmit sea ASÍNCRONA
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    

  // si tu backend NO acepta 'username' en el login:
    if (isLogin && data.username) delete data.username;
    
    // 3. Espera la respuesta de onSubmit (login/register)
    const success = await onSubmit(data); 

    // 4. Si el login/registro fue exitoso, redirige a 'home'
    if (success && setPage) {
      setPage('home'); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6"> {/* Más espacio entre elementos */}
        
        {/* Campo Username (SOLO REGISTRO) */}
        {!isLogin && (
          <input 
            name="username" 
            placeholder="Nombre de Usuario" 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
          />
        )}
        
        {/* Campo Email */}
        <input 
          name="email" 
          type="email" 
          placeholder="Correo Electrónico" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
        />
        
        {/* Campo Contraseña */}
        <input 
          name="password" 
          type="password" 
          placeholder="Contraseña" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
        />
        
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        
        {/* Botón de Enviar */}
        <Button 
          type="submit" 
          loading={loading} 
          icon={isLogin ? LogIn : UserPlus} 
          className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
        >
          {isLogin ? 'Entrar' : 'Registrarse'}
        </Button>
      </form>
      
      {/* Opción de cambiar entre Login y Register */}
      {/* 🛑 Necesitas pasar 'setPage' desde App.jsx para que esto funcione */}
      {setPage && (
        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <span 
            onClick={() => setPage(isLogin ? 'register' : 'login')}
            className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium"
          >
            {isLogin ? "Regístrate aquí" : "Inicia Sesión"}
          </span>
        </p>
      )}
    </div>
  );
}