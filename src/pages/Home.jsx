// src/pages/EnhancedHome.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Info, ArrowRight, Clock, Thermometer, Droplets, FileText, 
         Users, Landmark, School, HeartPulse, Building, Sun, Cloud, CloudRain, Mail } from 'lucide-react';

// Components
import EnhancedHero from '../components/common/Hero';

// API
import { obtenerClimaActual } from '../api/climaService';
import { obtenerAtraccionesPrincipales } from '../api/turismService';

// Assets
const heroImage = 'assets/images/hero-autumn.jpg';
const heroVideo = 'assets/videos/rio-trapiche-aereo.mp4';

// Service cards data
const serviciosCards = [
  { 
    title: 'Municipio Transparente', 
    icon: <Landmark size={40} className="text-indigo-600" />, 
    color: 'bg-indigo-50', 
    textColor: 'text-indigo-900',
    path: '/municipio-transparente',
    description: 'Gobierno abierto y acceso a información pública municipal.'
  },
  { 
    title: 'Vivir El Trapiche', 
    icon: <Building size={40} className="text-emerald-600" />, 
    color: 'bg-emerald-50', 
    textColor: 'text-emerald-900',
    path: '/vivir-el-trapiche',
    description: 'Servicios, educación, salud y calidad de vida para residentes.'
  },
  { 
    title: 'Turismo', 
    icon: <MapPin size={40} className="text-blue-600" />, 
    color: 'bg-blue-50', 
    textColor: 'text-blue-900',
    path: 'https://codeo.site/trapiche-web/',
    external: true,
    description: 'Atractivos naturales, actividades y servicios turísticos.'
  },
  { 
    title: 'Cómo Llegar', 
    icon: <ArrowRight size={40} className="text-amber-600" />, 
    color: 'bg-amber-50', 
    textColor: 'text-amber-900',
    path: '/como-llegar',
    description: 'Rutas de acceso, transporte público y ubicación.'
  }
];

// Icon mapper for weather conditions
const weatherIcons = {
  soleado: <Sun size={40} className="text-yellow-500" />,
  nublado: <Cloud size={40} className="text-gray-500" />,
  lluvia: <CloudRain size={40} className="text-blue-500" />,
  'parcialmente nublado': <Cloud size={40} className="text-gray-400" />
};

const EnhancedHome = () => {
  const [clima, setClima] = useState(null);
  const [atracciones, setAtracciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [climaData, atraccionesData] = await Promise.all([
          obtenerClimaActual(),
          obtenerAtraccionesPrincipales(4)
        ]);

        setClima(climaData);
        setAtracciones(atraccionesData);
      } catch (error) {
        console.error("Error cargando datos iniciales:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Formatter function for numerical values
  const formatNumber = (value) => {
    if (!value) return '--';
    
    try {
      const numero = parseFloat(value.replace(',', '.'));
      return numero.toFixed(1);
    } catch (error) {
      return value;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <EnhancedHero
        videoSrc={heroVideo}
        imageSrc={heroImage}
        title="El Trapiche"
        subtitle="Donde la naturaleza y la tradición se encuentran"
      >
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <a
            href="https://codeo.site/trapiche-web/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Descubrir El Trapiche
            <ArrowRight size={16} className="ml-2" />
          </a>
          <Link
            to="/como-llegar"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/50 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Cómo Llegar
          </Link>
        </div>
      </EnhancedHero>

      {/* Quick Info Cards */}
      <section className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About El Trapiche */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-md bg-opacity-90"
          >
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              <Info size={20} /> Sobre El Trapiche
            </h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Población:</span> 3.068 habitantes</p>
              <p><span className="font-medium">Fundación:</span> 12 de diciembre de 1792</p>
              <p><span className="font-medium">Altitud:</span> 700 metros s.n.m.</p>
              <p><span className="font-medium">Intendente:</span> Ricardo Olivera Aguirre</p>
              <Link to="/municipio-transparente" className="text-blue-600 hover:text-blue-800 flex items-center mt-2">
                Ver más información <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Discover El Trapiche */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg p-6 backdrop-blur-md"
          >
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <MapPin size={20} /> Destino natural privilegiado
            </h3>
            <p className="mb-4">
              Villa turística serrana a 39 km de San Luis capital, rodeada de montañas, ríos y embalses que hacen de El Trapiche un tesoro natural por descubrir.
            </p>
            <a 
              href="https://codeo.site/trapiche-web/"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Explorar atractivos
            </a>
          </motion.div>

          {/* Weather Widget */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-md bg-opacity-90"
          >
            {!cargando && clima ? (
              <>
                <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                  <Thermometer size={20} /> Clima Actual
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-5xl font-bold text-blue-800">
                    {formatNumber(clima.temp)}°C
                  </div>
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                    <Thermometer size={32} className="text-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-blue-50 p-2 rounded-lg flex items-center">
                    <Droplets size={18} className="text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-blue-500">Humedad</div>
                      <div className="font-medium">{formatNumber(clima.hh)}%</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg flex items-center">
                    <Clock size={18} className="text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-blue-500">Actualizado</div>
                      <div className="font-medium text-xs">{clima.fecha?.split(' ')[1]} {clima.fecha?.split(' ')[2]}</div>
                    </div>
                  </div>
                </div>
                <Link to="/vivir-el-trapiche#clima" className="text-blue-600 hover:text-blue-800 flex items-center mt-3 text-sm">
                  Ver pronóstico completo <ArrowRight size={14} className="ml-1" />
                </Link>
              </>
            ) : (
              <div className="animate-pulse flex flex-col space-y-3">
                <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Servicios Municipales</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La Municipalidad de El Trapiche ofrece diversos servicios para mejorar la calidad de vida de residentes y visitantes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviciosCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {card.external ? (
                <a 
                  href={card.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block h-full ${card.color} rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">{card.icon}</div>
                    <h3 className={`text-xl font-bold mb-2 ${card.textColor}`}>{card.title}</h3>
                    <p className="text-gray-700 mb-4 flex-grow">{card.description}</p>
                    <div className="flex items-center mt-2 text-blue-600 font-medium">
                      Visitar <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </a>
              ) : (
                <Link 
                  to={card.path}
                  className={`block h-full ${card.color} rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">{card.icon}</div>
                    <h3 className={`text-xl font-bold mb-2 ${card.textColor}`}>{card.title}</h3>
                    <p className="text-gray-700 mb-4 flex-grow">{card.description}</p>
                    <div className="flex items-center mt-2 text-blue-600 font-medium">
                      Explorar <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tourism Attractions */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Descubre Nuestros Tesoros Naturales</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Explora los impresionantes paisajes y atracciones naturales que El Trapiche tiene para ofrecer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cargando ? (
              // Loading placeholders
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-700 h-48 rounded-lg"></div>
                  <div className="mt-2 space-y-2">
                    <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              // Actual attraction cards
              atracciones.map((atraccion, index) => (
                <motion.div
                  key={atraccion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-lg group h-64"
                >
                  <img
                    src={atraccion.imagen || "assets/images/atraccion-default.jpg"}
                    alt={atraccion.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                    <h3 className="font-bold text-xl mb-1">{atraccion.nombre}</h3>
                    {atraccion.descripcionCorta && (
                      <p className="text-white/90 text-sm mb-2 line-clamp-2">
                        {atraccion.descripcionCorta}
                      </p>
                    )}
                    <a 
                      href="https://codeo.site/trapiche-web/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                    >
                      Ver más
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <a 
              href="https://codeo.site/trapiche-web/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-800 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Explorar Todos los Atractivos
            </a>
          </div>
        </div>
      </section>

      {/* Quick Access Links */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Accesos Directos</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/municipio-transparente/autoridades" className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-6 text-center hover:shadow-md transition-all">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={22} className="text-indigo-600" />
            </div>
            <h3 className="font-medium text-indigo-900">Autoridades</h3>
          </Link>

          <Link to="/municipio-transparente/ordenanzas" className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-6 text-center hover:shadow-md transition-all">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText size={22} className="text-emerald-600" />
            </div>
            <h3 className="font-medium text-emerald-900">Ordenanzas</h3>
          </Link>

          <Link to="/municipio-transparente/tramites" className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 text-center hover:shadow-md transition-all">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Landmark size={22} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-blue-900">Trámites</h3>
          </Link>

          <Link to="/contacto" className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-lg p-6 text-center hover:shadow-md transition-all">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail size={22} className="text-rose-600" />
            </div>
            <h3 className="font-medium text-rose-900">Contacto</h3>
          </Link>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ubicación</h2>
              <p className="text-gray-600 mb-6">
                El Trapiche se encuentra en el departamento Coronel Pringles, a 39 km al noreste de la ciudad de San Luis capital.
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Cómo llegar</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs">1</span>
                    </div>
                    <span>Desde San Luis capital: Tomar Ruta Provincial 9 en dirección noreste (39 km)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs">2</span>
                    </div>
                    <span>Desde Villa Mercedes: Tomar RN 7 hacia San Luis y luego RP 9 (120 km)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs">3</span>
                    </div>
                    <span>Servicios regulares de autobús disponibles desde la terminal de San Luis</span>
                  </li>
                </ul>
              </div>
              
              <Link to="/como-llegar" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Más información para llegar
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13348.676903097285!2d-66.05738056!3d-33.102925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4394e16867ae9%3A0xbc8d79e1d59d5e5!2sEl%20Trapiche%2C%20San%20Luis!5e0!3m2!1ses!2sar!4v1625120000000!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Mapa de El Trapiche"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHome;