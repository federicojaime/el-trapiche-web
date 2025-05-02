// Componente principal de la aplicación
// src/App.jsx

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './Router';
import "./styles/globals.css";

// Crear cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;