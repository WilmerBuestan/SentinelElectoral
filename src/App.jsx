// src/App.jsx
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './Login';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Revisamos si ya hay una sesión activa al cargar la página
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escuchamos cambios (si se desloguea o loguea)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Si no hay sesión, mostramos el Login
  if (!session) {
    return <Login onLogin={setSession} />;
  }

  // Si hay sesión, mostramos la App principal
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Misión Activa</h1>
        <p>Has ingresado como: {session.user.email}</p>
        
        <button 
          onClick={() => supabase.auth.signOut()}
          className="mt-8 bg-red-500/10 text-red-500 border border-red-500/50 px-4 py-2 rounded hover:bg-red-500/20"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default App;