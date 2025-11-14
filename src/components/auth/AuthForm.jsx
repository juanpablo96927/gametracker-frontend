// src/components/auth/AuthForm.jsx
import { LogIn, UserPlus, Loader } from 'lucide-react';
import Button from '../ui/Button';

export default function AuthForm({ type, onSubmit, loading, error }) {
  const isLogin = type === 'login';

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    if (!isLogin) delete data.email; // register no necesita email si no lo usas
    onSubmit(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input name="username" placeholder="Usuario" required className="input" />
        )}
        <input name="email" type="email" placeholder="Email" required className="input" />
        <input name="password" type="password" placeholder="Contraseña" required className="input" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" loading={loading} icon={isLogin ? LogIn : UserPlus}>
          {isLogin ? 'Entrar' : 'Registrarse'}
        </Button>
      </form>
    </div>
  );
}