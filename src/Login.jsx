// src/Login.jsx
import { useState } from 'react';
import { supabase } from './supabaseClient';
import { ShieldCheck } from 'lucide-react';

export default function Login({ onLogin }) {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Formateamos la cédula como email para Supabase Auth
    const email = `${cedula}@mil.ec`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas o usuario no registrado.');
    } else {
      onLogin(data.session);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-lime-400/10 p-4 rounded-full mb-4">
            <ShieldCheck className="w-12 h-12 text-lime-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 text-center uppercase tracking-wider">
            Sentinel <span className="text-lime-400">C2</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Control de Material Electoral</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Cédula de Identidad
            </label>
            <input
              type="text"
              required
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
              placeholder="Ej: 17xxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors flex justify-center"
          >
            {loading ? 'Autenticando...' : 'INGRESAR AL SISTEMA'}
          </button>
        </form>
      </div>
    </div>
  );
}