// src/components/common/EnhancedFooter.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Twitter, ChevronRight, Send, Landmark, FileText, Users } from 'lucide-react';

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Logo path
  const municipalLogo = '/assets/images/logo-municipalidad-blanco.svg';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      // In production, send to backend
    }
  };

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      {/* Top wave decoration */}
      <div className="overflow-hidden leading-0">
        <svg
          className="relative block w-full h-12 md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#1e3a8a"
          ></path>
        </svg>
      </div>

      {/* Main footer content */}
      <div className="pt-6 pb-12">
        <div className="container mx-auto px-4">
          {/* Top section with logo and social media */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-blue-800 pb-6">
            <div className="flex items-center mb-6 md:mb-0">
              <img src={municipalLogo} alt="Municipalidad de El Trapiche" className="h-16 md:h-20" />
              <div className="ml-4">
                <h2 className="text-2xl font-bold leading-tight">Municipalidad</h2>
                <h3 className="text-lg text-blue-200">El Trapiche</h3>
              </div>
            </div>

            <div>
              <div className="text-sm text-blue-200 mb-2 text-center md:text-right">Seguinos en redes sociales</div>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com/munieltrapiche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://instagram.com/munieltrapiche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://youtube.com/channel/munieltrapiche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="https://twitter.com/munieltrapiche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Información de contacto */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-100">Información de contacto</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin size={20} className="mr-3 mt-1 flex-shrink-0 text-blue-300" />
                  <span>Ruta Provincial 9, El Trapiche, San Luis, Argentina, CP 5701</span>
                </li>
                <li className="flex items-center">
                  <Phone size={20} className="mr-3 flex-shrink-0 text-blue-300" />
                  <span>(02652) 493 025</span>
                </li>
                <li className="flex items-center">
                  <Mail size={20} className="mr-3 flex-shrink-0 text-blue-300" />
                  <span>contacto@eltrapiche.gob.ar</span>
                </li>
                <li className="flex items-center">
                  <Clock size={20} className="mr-3 flex-shrink-0 text-blue-300" />
                  <span>Lunes a Viernes: 8:00 a 14:00</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Enlaces rápidos */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-100">Enlaces rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/municipio-transparente" className="flex items-center hover:text-blue-300 transition-colors">
                    <ChevronRight size={16} className="mr-2 text-blue-400" />
                    Municipio Transparente
                  </Link>
                </li>
                <li>
                  <Link to="/vivir-el-trapiche" className="flex items-center hover:text-blue-300 transition-colors">
                    <ChevronRight size={16} className="mr-2 text-blue-400" />
                    Vivir El Trapiche
                  </Link>
                </li>
                <li>
                  <a href="https://codeo.site/trapiche-web/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-300 transition-colors">
                    <ChevronRight size={16} className="mr-2 text-blue-400" />
                    Turismo
                  </a>
                </li>
                <li>
                  <Link to="/como-llegar" className="flex items-center hover:text-blue-300 transition-colors">
                    <ChevronRight size={16} className="mr-2 text-blue-400" />
                    Cómo Llegar
                  </Link>
                </li>
                <li>
                  <Link to="/contacto" className="flex items-center hover:text-blue-300 transition-colors">
                    <ChevronRight size={16} className="mr-2 text-blue-400" />
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Accesos administrativos */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-100">Servicios municipales</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/municipio-transparente/tramites" className="flex items-center hover:text-blue-300 transition-colors">
                    <Landmark size={16} className="mr-2 text-blue-400" />
                    Trámites Online
                  </Link>
                </li>
                <li>
                  <Link to="/municipio-transparente/ordenanzas" className="flex items-center hover:text-blue-300 transition-colors">
                    <FileText size={16} className="mr-2 text-blue-400" />
                    Ordenanzas Municipales
                  </Link>
                </li>
                <li>
                  <Link to="/municipio-transparente/autoridades" className="flex items-center hover:text-blue-300 transition-colors">
                    <Users size={16} className="mr-2 text-blue-400" />
                    Autoridades
                  </Link>
                </li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-4 text-blue-100">Emergencias</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-red-400" />
                  <span>Policía: 911</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-red-400" />
                  <span>Bomberos: (02652) 493 099</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter subscription */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-100">Boletín informativo</h3>
              <p className="text-sm text-blue-200 mb-4">
                Suscríbete para recibir las últimas noticias y novedades de El Trapiche directamente en tu correo.
              </p>

              {subscribed ? (
                <div className="bg-blue-800 p-4 rounded-md text-center">
                  <p className="text-blue-100">¡Gracias por suscribirte!</p>
                  <p className="text-sm text-blue-300 mt-1">Te mantendremos informado sobre las novedades de El Trapiche.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-4">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-r-md flex items-center justify-center"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              )}


            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-blue-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
            <p>© {currentYear} Municipalidad de El Trapiche.</p>
            <div className="mt-2 md:mt-0 flex space-x-6">
              <Link to="/#" className="hover:text-white transition-colors">Desarrollado por Codeo.Ar</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;