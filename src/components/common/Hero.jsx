// Componente Hero para cabecera de página
// src/components/common/Hero.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ 
  videoSrc,  // URL del video de fondo
  imageSrc,  // URL de imagen alternativa
  title,     // Título principal
  subtitle,  // Subtítulo
  height = 'large', // 'small', 'medium', 'large'
  overlay = true,   // Mostrar overlay oscuro
  children           // Contenido adicional
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  // Determinar la altura del hero
  const getHeight = () => {
    switch (height) {
      case 'small': return 'h-64';
      case 'medium': return 'h-96';
      case 'large': return 'h-screen min-h-[600px] max-h-[800px]';
      default: return 'h-screen min-h-[600px] max-h-[800px]';
    }
  };

  // Manejar carga del video
  useEffect(() => {
    if (videoSrc) {
      const video = document.getElementById('background-video');
      if (video) {
        video.addEventListener('loadeddata', () => {
          setIsVideoLoaded(true);
        });
      }
    }
  }, [videoSrc]);

  return (
    <div className={`relative w-full overflow-hidden ${getHeight()}`}>
      {/* Background Video */}
      {videoSrc && (
        <video
          id="background-video"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      )}
      
      {/* Background Image (fallback o alternativa) */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover ${
            videoSrc && isVideoLoaded ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-1000`}
        />
      )}
      
      {/* Overlay para mejorar legibilidad del texto */}
      {overlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/30"></div>
      )}
      
      {/* Contenido del Hero */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl font-light max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
        
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;