// src/components/common/EnhancedHero.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Import images - mejor gestión de imágenes
const heroImages = {
  home: '/assets/images/el-trapiche-vista.jpg',
  tourism: '/assets/images/turismo/paisaje-el-trapiche.jpg',
  contact: '/assets/images/contacto/municipalidad-frente.jpg',
  howToGet: '/assets/images/como-llegar/ruta-el-trapiche.jpg',
  municipality: '/assets/images/municipio/edificio-municipal.jpg',
  living: '/assets/images/vivir/plaza-central.jpg'
};

const EnhancedHero = ({ 
  videoSrc,
  imageSrc,
  title,
  subtitle,
  height = 'large',
  overlay = true,
  children,
  breadcrumbs = []
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Determine the height of the hero
  const getHeight = () => {
    switch (height) {
      case 'small': return 'h-64 md:h-72';
      case 'medium': return 'h-96 md:h-[450px]';
      case 'large': return 'h-[75vh] min-h-[600px] max-h-[800px]';
      default: return 'h-[75vh] min-h-[600px] max-h-[800px]';
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle video loading
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

  const parallaxOffset = scrollPosition * 0.4;

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
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      )}
      
      {/* Background Image (fallback or alternative) - mejor gestión con filtros */}
      {imageSrc && (
        <div
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center ${
            videoSrc && isVideoLoaded ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-1000`}
          style={{
            backgroundImage: `url(${imageSrc})`,
            transform: `translateY(${parallaxOffset}px)`,
            filter: 'brightness(0.85)' // Mejora la visibilidad del texto
          }}
        />
      )}
      
      {/* Overlay para mejorar legibilidad del texto - versión mejorada */}
      {overlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/30 to-black/40"></div>
      )}
      
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="absolute top-32 left-0 w-full z-10">
          <div className="container mx-auto px-4">
            <ul className="flex items-center text-white/90 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">›</span>}
                  {crumb.url ? (
                    <a href={crumb.url} className="hover:text-white transition-colors">
                      {crumb.name}
                    </a>
                  ) : (
                    <span>{crumb.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Hero Content - ahora con mejor sombra para el texto */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {title}
          </h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
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
        </motion.div>
      </div>
      
      {/* Decorative wave effect - mejor posicionamiento */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-10">
        <svg
          className="relative block w-full h-12 md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#ffffff"
            fillOpacity="0.8"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default EnhancedHero;