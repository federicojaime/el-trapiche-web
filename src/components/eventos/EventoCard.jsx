// Componente para mostrar una tarjeta de evento
// src/components/eventos/EventoCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const EventoCard = ({ 
  titulo, 
  fecha, 
  imagen, 
  descripcion, 
  lugar, 
  url 
}) => {
  // Formatear fecha para mostrar
  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'Fecha por confirmar';
    
    try {
      const fecha = new Date(fechaString);
      return new Intl.DateTimeFormat('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(fecha);
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return fechaString;
    }
  };

  // Limitar longitud de descripción
  const descripcionCorta = descripcion && descripcion.length > 120 
    ? `${descripcion.substring(0, 120)}...` 
    : descripcion;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        {/* Imagen del evento */}
        <img 
          src={imagen || '/assets/images/evento-default.jpg'} 
          alt={titulo} 
          className="w-full h-48 object-cover"
        />
        
        {/* Etiqueta de fecha flotante */}
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          <Calendar size={14} className="inline-block mr-1" />
          {formatearFecha(fecha)}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{titulo}</h3>
        
        {lugar && (
          <p className="text-gray-600 mb-3 flex items-center gap-1">
            <MapPin size={16} className="text-orange-500" />
            {lugar}
          </p>
        )}
        
        {descripcionCorta && (
          <p className="text-gray-700 mb-4">{descripcionCorta}</p>
        )}
        
        <Link 
          to={url} 
          className="text-orange-500 font-medium flex items-center gap-1 hover:gap-2 transition-all group"
        >
          Ver detalles
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default EventoCard;