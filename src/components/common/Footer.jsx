// Componente de pie de página
// src/components/common/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Municipalidad de El Trapiche</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>Ruta Provincial 9, El Trapiche, San Luis, Argentina</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>(02652) 493 025</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>contacto@eltrapiche.gob.ar</span>
              </li>
              <li className="flex items-center">
                <Clock size={20} className="mr-2 flex-shrink-0" />
                <span>Lunes a Viernes: 8:00 a 14:00</span>
              </li>
            </ul>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/municipio-transparente" className="hover:text-blue-300 transition-colors">
                  Municipio Transparente
                </Link>
              </li>
              <li>
                <Link to="/vivir-el-trapiche" className="hover:text-blue-300 transition-colors">
                  Vivir El Trapiche
                </Link>
              </li>
              <li>
                <Link to="/turismo" className="hover:text-blue-300 transition-colors">
                  Turismo
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-blue-300 transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/como-llegar" className="hover:text-blue-300 transition-colors">
                  Cómo Llegar
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-blue-300 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales y suscripción */}
          <div>
            <h3 className="text-xl font-bold mb-4">Conectate con nosotros</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com/munieltrapiche" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com/munieltrapiche" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://youtube.com/channel/munieltrapiche" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
            
            <h4 className="text-lg font-medium mb-3">Suscribite al boletín</h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-r-md"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
        
        {/* Línea divisoria */}
        <hr className="border-blue-800 my-6" />
        
        {/* Copyright */}
        <div className="text-center text-blue-300 text-sm">
          <p>© {new Date().getFullYear()} Municipalidad de El Trapiche. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;