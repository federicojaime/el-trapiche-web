// Componentes de UI - Tabs
// src/components/ui/tabs.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Contexto para las pestañas
const TabsContext = createContext(null);

// Componente principal de pestañas
const Tabs = ({ defaultValue, children, className = '', ...props }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={`tabs ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Lista de pestañas (contenedor de triggers)
const TabsList = ({ children, className = '', ...props }) => {
  return (
    <div 
      role="tablist" 
      className={`flex flex-wrap ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

// Trigger de pestañas (botón para cambiar)
const TabsTrigger = ({ value, children, className = '', ...props }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger debe usarse dentro de un componente Tabs');
  }
  
  const isActive = context.value === value;
  
  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      className={`px-4 py-2 font-medium transition-colors rounded-lg ${
        isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-100'
      } ${className}`}
      onClick={() => context.setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
};

// Contenido de pestañas
const TabsContent = ({ value, children, className = '', ...props }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent debe usarse dentro de un componente Tabs');
  }
  
  const isActive = context.value === value;
  
  if (!isActive) return null;
  
  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };