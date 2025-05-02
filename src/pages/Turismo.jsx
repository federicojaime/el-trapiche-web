// Página de Turismo
// src/pages/Turismo.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Car ,Bus , Camera, Compass, Utensils, Info } from 'lucide-react';

// Componentes
import Hero from '../components/common/Hero';
import MapaInteractivo from '../components/mapa/MapaInteractivo';
import AtraccionCard from '../components/turismo/AtraccionCard';
import GaleriaFotos from '../components/turismo/GaleriaFotos';

// API
import { obtenerAtraccionesPrincipales, obtenerPuntosDeInteres } from '../api/turismService';

const Turismo = () => {
  const [atracciones, setAtracciones] = useState([]);
  const [puntosInteres, setPuntosInteres] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [cargando, setCargando] = useState(true);

  // Cargar datos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [atraccionesData, puntosData] = await Promise.all([
          obtenerAtraccionesPrincipales(8),
          obtenerPuntosDeInteres()
        ]);
        
        setAtracciones(atraccionesData);
        setPuntosInteres(puntosData);
      } catch (error) {
        console.error("Error cargando datos turísticos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Filtrar atracciones por categoría
  const atraccionesFiltradas = categoriaActiva === 'todos'
    ? atracciones
    : atracciones.filter(atraccion => atraccion.categoria === categoriaActiva);

  // Categorías disponibles
  const categorias = [
    { id: 'todos', nombre: 'Todos', icono: <Compass size={20} /> },
    { id: 'embalses', nombre: 'Embalses', icono: <MapPin size={20} /> },
    { id: 'balnearios', nombre: 'Balnearios', icono: <MapPin size={20} /> },
    { id: 'miradores', nombre: 'Miradores', icono: <MapPin size={20} /> },
    { id: 'avistaje', nombre: 'Avistaje', icono: <MapPin size={20} /> },
    { id: 'camping', nombre: 'Camping', icono: <MapPin size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero con imagen de fondo */}
      <Hero 
        imageSrc="/assets/images/turismo/paisaje-el-trapiche.jpg"
        title="Turismo en El Trapiche"
        subtitle="Descubre los maravillosos paisajes serranos y atractivos naturales"
        height="large"
      >
        <button className="mt-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Camera size={20} />
          Ver galería de imágenes
        </button>
      </Hero>

      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Descubre El Trapiche</h2>
          
          <p className="text-gray-700 mb-6 text-lg">
            El Trapiche es un destino turístico de montaña ubicado en la sierra de San Luis, a solo 39 km de la capital provincial.
            Su nombre proviene del primer "trapiche" (molino) que procesaba el oro extraído de la zona de La Carolina en la época colonial.
            Este encantador pueblo serrano combina naturaleza, historia y gastronomía local para ofrecer una experiencia única a sus visitantes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-bold text-blue-800 text-lg mb-2 flex items-center gap-2">
                <MapPin size={20} />
                Ubicación privilegiada
              </h3>
              <p className="text-gray-700">
                Enmarcado por las sierras de San Luis a 700 metros sobre el nivel del mar,
                El Trapiche ofrece un clima agradable y paisajes pintorescos durante todo el año.
              </p>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-bold text-blue-800 text-lg mb-2 flex items-center gap-2">
                <Compass size={20} />
                Actividades al aire libre
              </h3>
              <p className="text-gray-700">
                Senderismo, pesca deportiva, cabalgatas, avistaje de aves y deportes náuticos
                son algunas de las actividades que se pueden disfrutar en nuestro entorno natural.
              </p>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-bold text-blue-800 text-lg mb-2 flex items-center gap-2">
                <Utensils size={20} />
                Gastronomía regional
              </h3>
              <p className="text-gray-700">
                Disfruta de la deliciosa cocina regional con platos típicos, 
                productos artesanales, miel de montaña y dulces caseros elaborados localmente.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mapa interactivo */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Mapa turístico interactivo</h2>
            <div className="text-sm text-gray-500">
              <Info size={16} className="inline-block mr-1" />
              Selecciona los puntos en el mapa para más información
            </div>
          </div>
          
          <MapaInteractivo puntos={puntosInteres} categoriaInicial="todos" />
        </div>
        
        {/* Atracciones turísticas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Atractivos turísticos</h2>
          
          {/* Filtros de categoría */}
          <div className="flex overflow-x-auto pb-3 mb-6">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 mr-3 whitespace-nowrap transition-colors ${
                  categoriaActiva === categoria.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setCategoriaActiva(categoria.id)}
              >
                {categoria.icono}
                {categoria.nombre}
              </button>
            ))}
          </div>
          
          {/* Grid de atracciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cargando ? (
              // Esqueleto de carga
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg"></div>
                  <div className="mt-2 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : atraccionesFiltradas.length > 0 ? (
              // Atracciones filtradas
              atraccionesFiltradas.map((atraccion, index) => (
                <motion.div
                  key={atraccion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AtraccionCard 
                    nombre={atraccion.nombre}
                    imagen={atraccion.imagen}
                    descripcionCorta={atraccion.descripcionCorta}
                    url={`/turismo/${atraccion.id}`}
                    destacado={index === 0 && categoriaActiva === 'todos'}
                  />
                </motion.div>
              ))
            ) : (
              // Mensaje si no hay resultados
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-3">
                  <Compass size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron atractivos</h3>
                <p className="text-gray-600">No hay atractivos en la categoría seleccionada.</p>
                <button 
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setCategoriaActiva('todos')}
                >
                  Ver todos los atractivos
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Galería de fotos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Galería de imágenes</h2>
          <GaleriaFotos />
        </div>
        
        {/* Información práctica */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Información práctica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Cómo llegar</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1 flex items-center gap-2">
                    <Car size={18} className="text-blue-600" />
                    En automóvil
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Desde San Luis Capital, tomar la Ruta Provincial 9 en dirección noreste. 
                    El trayecto de 39 km está completamente asfaltado y señalizado.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1 flex items-center gap-2">
                    <Bus size={18} className="text-blue-600" />
                    En transporte público
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Servicio regular de autobuses desde la terminal de San Luis Capital. 
                    Empresas: Panamericana y María del Rosario, con frecuencias diarias.
                  </p>
                  <a href="/como-llegar" className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-block mt-2">
                    Ver horarios completos →
                  </a>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">Mejor época para visitar</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  El Trapiche puede visitarse durante todo el año, cada temporada ofrece experiencias diferentes:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="font-medium w-24">Primavera:</span>
                    <span>Clima ideal, floración en las sierras y eventos culturales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium w-24">Verano:</span>
                    <span>Alta temporada turística, balnearios activos y festivales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium w-24">Otoño:</span>
                    <span>Paisajes coloridos y clima fresco, ideal para senderismo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium w-24">Invierno:</span>
                    <span>Más tranquilo, ideal para descanso y turismo contemplativo.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Alojamiento</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1">Cabañas</h4>
                  <p className="text-gray-600 text-sm">
                    Diversas opciones de cabañas y complejos turísticos, desde opciones familiares
                    hasta alojamientos premium con vistas a las sierras.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1">Campings</h4>
                  <p className="text-gray-600 text-sm">
                    Áreas de camping equipadas a orillas del río y cerca del embalse, 
                    con servicios básicos e infraestructura para acampar.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1">Hoteles y posadas</h4>
                  <p className="text-gray-600 text-sm">
                    Alojamientos en el casco urbano, opciones con encanto local 
                    y atención personalizada.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">Recomendaciones</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs">✓</span>
                    </div>
                    <span>Reservar alojamiento con anticipación, especialmente en temporada alta (diciembre a febrero).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs">✓</span>
                    </div>
                    <span>Llevar ropa cómoda para caminatas y actividades al aire libre.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs">✓</span>
                    </div>
                    <span>Consultar el pronóstico del tiempo antes de la visita.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs">✓</span>
                    </div>
                    <span>Visitar la Oficina de Turismo al llegar para obtener mapas e información actualizada.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Turismo;