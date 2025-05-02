// src/pages/EnhancedTurismo.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Compass, Hotel, Utensils, Camera } from 'lucide-react';
import EnhancedHero from '../components/common/Hero';

// Imagen para el Hero
const heroImage = '/assets/images/turismo/paisaje-el-trapiche.jpg';

const EnhancedTurismo = () => {
  // Redireccionar automáticamente después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://codeo.site/trapiche-web/';
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        imageSrc={heroImage}
        title="Turismo en El Trapiche"
        subtitle="Estás siendo redirigido al portal oficial de turismo..."
        height="medium"
      />
      
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
        >
          <Compass size={64} className="mx-auto text-blue-600 mb-6" />
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Redireccionando al Portal de Turismo
          </h2>
          
          <p className="text-gray-600 mb-6">
            Estás siendo redirigido automáticamente al portal oficial de turismo de El Trapiche. 
            Si no eres redirigido en 5 segundos, haz clic en el botón de abajo.
          </p>
          
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <a 
                href="https://codeo.site/trapiche-web/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                Ir al Portal de Turismo
                <ExternalLink size={18} className="ml-2" />
              </a>
            </motion.div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2">Lo que encontrarás en el Portal de Turismo:</h3>
            <ul className="text-gray-600 text-left max-w-md mx-auto space-y-2">
              <li className="flex items-start">
                <MapPin size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span>Atractivos naturales, actividades y excursiones</span>
              </li>
              <li className="flex items-start">
                <Hotel size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span>Alojamiento, cabañas y opciones de hospedaje</span>
              </li>
              <li className="flex items-start">
                <Utensils size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span>Gastronomía local y servicios turísticos</span>
              </li>
              <li className="flex items-start">
                <Camera size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span>Galería de imágenes y videos de nuestros tesoros naturales</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-600">
            Nota: Estás siendo redirigido a un sitio externo específico para turismo.
            Vuelve a la página municipal en cualquier momento para acceder a los servicios de la Municipalidad.
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default EnhancedTurismo;