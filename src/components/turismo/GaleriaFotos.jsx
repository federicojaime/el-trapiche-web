// Componente Galería de Fotos para la sección de turismo
// src/components/turismo/GaleriaFotos.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Camera } from 'lucide-react';

const GaleriaFotos = () => {
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  // Categorías disponibles
  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'embalses', nombre: 'Embalses' },
    { id: 'balnearios', nombre: 'Balnearios' },
    { id: 'miradores', nombre: 'Miradores' },
    { id: 'eventos', nombre: 'Eventos' }
  ];

  // Datos de ejemplo para fotos (en producción, vendrían de API)
  const fotos = [
    {
      id: 1,
      src: '/assets/images/turismo/embalse-florida-1.jpg',
      alt: 'Vista panorámica del Embalse La Florida',
      categoria: 'embalses',
      descripcion: 'Vista panorámica del Embalse La Florida desde el mirador norte, rodeado de sierras.'
    },
    {
      id: 2,
      src: '/assets/images/turismo/rio-trapiche-1.jpg',
      alt: 'Río Trapiche',
      categoria: 'balnearios',
      descripcion: 'El Río Trapiche en su paso por la localidad, con sus aguas cristalinas y áreas para bañistas.'
    },
    {
      id: 3,
      src: '/assets/images/turismo/mirador-1.jpg',
      alt: 'Mirador Cerro de Oro',
      categoria: 'miradores',
      descripcion: 'Vista desde el Mirador Cerro de Oro, uno de los puntos más altos de la zona con vistas de 360°.'
    },
    {
      id: 4,
      src: '/assets/images/eventos/fiesta-rios-1.jpg',
      alt: 'Fiesta Provincial de los Ríos',
      categoria: 'eventos',
      descripcion: 'Celebración de la Fiesta Provincial de los Ríos con espectáculos musicales en vivo.'
    },
    {
      id: 5,
      src: '/assets/images/turismo/embalse-florida-2.jpg',
      alt: 'Actividades náuticas en el Embalse',
      categoria: 'embalses',
      descripcion: 'Deportes náuticos y actividades recreativas en las aguas del Embalse La Florida.'
    },
    {
      id: 6,
      src: '/assets/images/turismo/rio-trapiche-2.jpg',
      alt: 'Balneario natural',
      categoria: 'balnearios',
      descripcion: 'Área de balneario natural en el Río Trapiche, popular en la temporada estival.'
    },
    {
      id: 7,
      src: '/assets/images/turismo/mirador-2.jpg',
      alt: 'Sendero hacia el mirador',
      categoria: 'miradores',
      descripcion: 'Sendero de trekking que conduce hacia los miradores panorámicos de las sierras.'
    },
    {
      id: 8,
      src: '/assets/images/eventos/festival-pescador-1.jpg',
      alt: 'Festival del Pescador',
      categoria: 'eventos',
      descripcion: 'Concurso de pesca durante el tradicional Festival del Pescador en el Embalse La Florida.'
    }
  ];

  // Filtrar fotos según categoría seleccionada
  const fotosFiltradas = categoriaActiva === 'todos'
    ? fotos
    : fotos.filter(foto => foto.categoria === categoriaActiva);

  // Abrir foto en vista ampliada
  const abrirFoto = (foto) => {
    setFotoSeleccionada(foto);
  };

  // Cerrar foto ampliada
  const cerrarFoto = () => {
    setFotoSeleccionada(null);
  };

  // Navegar a la foto anterior
  const fotoAnterior = () => {
    const indiceActual = fotosFiltradas.findIndex(foto => foto.id === fotoSeleccionada.id);
    const nuevoIndice = (indiceActual - 1 + fotosFiltradas.length) % fotosFiltradas.length;
    setFotoSeleccionada(fotosFiltradas[nuevoIndice]);
  };

  // Navegar a la foto siguiente
  const fotoSiguiente = () => {
    const indiceActual = fotosFiltradas.findIndex(foto => foto.id === fotoSeleccionada.id);
    const nuevoIndice = (indiceActual + 1) % fotosFiltradas.length;
    setFotoSeleccionada(fotosFiltradas[nuevoIndice]);
  };

  return (
    <div>
      {/* Filtros de categoría */}
      <div className="flex overflow-x-auto pb-3 mb-6">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            className={`px-4 py-2 rounded-full font-medium mr-3 whitespace-nowrap transition-colors ${
              categoriaActiva === categoria.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setCategoriaActiva(categoria.id)}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      {/* Grid de imágenes */}
      {fotosFiltradas.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fotosFiltradas.map((foto) => (
            <motion.div
              key={foto.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => abrirFoto(foto)}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <img 
                  src={foto.src} 
                  alt={foto.alt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Camera size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">No hay imágenes disponibles</h3>
          <p className="text-gray-600 mb-4">
            No hay fotos en la categoría seleccionada.
          </p>
          <button 
            onClick={() => setCategoriaActiva('todos')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Ver todas las fotos
          </button>
        </div>
      )}

      {/* Modal de foto ampliada */}
      <AnimatePresence>
        {fotoSeleccionada && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={cerrarFoto}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                onClick={cerrarFoto}
              >
                <X size={24} />
              </button>
              
              <img 
                src={fotoSeleccionada.src} 
                alt={fotoSeleccionada.alt} 
                className="max-h-[80vh] w-auto mx-auto"
              />
              
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button 
                  className="w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 focus:outline-none ml-4"
                  onClick={fotoAnterior}
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
              
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button 
                  className="w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 focus:outline-none mr-4"
                  onClick={fotoSiguiente}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <h3 className="text-lg font-bold mb-1">{fotoSeleccionada.alt}</h3>
                <p className="text-sm text-gray-200">{fotoSeleccionada.descripcion}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GaleriaFotos;