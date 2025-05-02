// src/components/common/EnhancedHeader.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search, Info, PhoneCall } from 'lucide-react';

const EnhancedHeader = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [submenuOpen, setSubmenuOpen] = useState(null);
    const [showAnnouncement, setShowAnnouncement] = useState(true);

    // Municipal logo import - asegúrate de que la ruta sea correcta
    const municipalLogo = '/assets/images/logo-municipalidad.png';

    // Detect scroll to change header styles
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle menu state
    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    
    // Toggle search bar
    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
        if (searchOpen) {
            setSearchQuery('');
        }
    };
    
    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // In production, redirect to search results page
            // window.location.href = `/buscar?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    // Navigation links with submenu support (without events)
    const enlaces = [
        { 
            nombre: 'Inicio', 
            path: '/' 
        },
        { 
            nombre: 'Municipio', 
            path: '/municipio-transparente',
            submenus: [
                { nombre: 'Autoridades', path: '/municipio-transparente#autoridades' },
                { nombre: 'Ordenanzas', path: '/municipio-transparente#ordenanzas' },
                { nombre: 'Trámites Online', path: '/municipio-transparente#tramites' }
            ]
        },
        { 
            nombre: 'Vivir El Trapiche', 
            path: '/vivir-el-trapiche',
            submenus: [
                { nombre: 'Clima', path: '/vivir-el-trapiche#clima' },
                { nombre: 'Educación', path: '/vivir-el-trapiche#educacion' },
                { nombre: 'Salud', path: '/vivir-el-trapiche#salud' },
                { nombre: 'Servicios', path: '/vivir-el-trapiche#servicios' }
            ]
        },
        { 
            nombre: 'Turismo', 
            path: 'https://codeo.site/trapiche-web/',
            external: true
        },
        { 
            nombre: 'Cómo Llegar', 
            path: '/como-llegar' 
        },
        { 
            nombre: 'Contacto', 
            path: '/contacto' 
        },
    ];

    // Animations
    const mobileMenuVariants = {
        closed: { opacity: 0, y: -20, height: 0 },
        open: { opacity: 1, y: 0, height: 'auto' }
    };
    
    const searchBarVariants = {
        closed: { opacity: 0, width: 0 },
        open: { opacity: 1, width: '100%' }
    };

    return (
        <>
            {/* Announcement bar - ahora con colores mejorados */}
            <AnimatePresence>
                {showAnnouncement && (
                    <div className="bg-blue-600 text-white text-center py-2 px-4 relative">
                        <div className="container mx-auto flex items-center justify-center text-sm md:text-base">
                            <Info size={16} className="mr-2 text-white" />
                            <span>Información importante: Nuevo sistema de trámites online disponible</span>
                            <Link to="/municipio-transparente/tramites" className="ml-2 underline text-white hover:text-blue-100">
                                Más info
                            </Link>
                        </div>
                        <button 
                            onClick={() => setShowAnnouncement(false)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-100"
                            aria-label="Cerrar anuncio"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
            </AnimatePresence>
        
            {/* Top utility bar - mejorado con mejor contraste */}
            <div className={`hidden md:block py-2 text-xs ${scrolled ? 'bg-white text-gray-700' : 'bg-white/10 backdrop-blur-md text-white'}`}>
                <div className="container mx-auto px-4 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <a href="tel:+542652493025" className="flex items-center hover:underline">
                            <PhoneCall size={14} className="mr-1" />
                            (02652) 493 025
                        </a>
                        <a href="mailto:contacto@eltrapiche.gob.ar" className="hover:underline">
                            contacto@eltrapiche.gob.ar
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/municipio-transparente/tramites" className="hover:underline">
                            Trámites Online
                        </Link>
                        <Link to="/contacto" className="hover:underline">
                            Atención al Ciudadano
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Main header - ajustado para mejor visualización */}
            <header
                className={`sticky top-0 w-full z-50 transition-all duration-300 ${
                    scrolled 
                        ? 'bg-white shadow-md py-3' 
                        : 'bg-transparent py-4'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {/* Logo - ajustado tamaño y alineación */}
                        <Link to="/" className="flex items-center">
                            <img
                                src={municipalLogo}
                                alt="Municipalidad de El Trapiche"
                                className="h-14 md:h-16"
                            />
                            <div className={`ml-3 transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                                <h1 className="text-xl font-bold leading-tight">Municipalidad</h1>
                                <h2 className="text-sm font-medium">El Trapiche</h2>
                            </div>
                        </Link>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex items-center space-x-2">
                            <nav className="flex space-x-1">
                                {enlaces.map((enlace) => (
                                    <div key={enlace.path} className="relative group">
                                        {enlace.external ? (
                                            <a
                                                href={enlace.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                    scrolled 
                                                        ? 'text-gray-700 hover:bg-gray-100' 
                                                        : 'text-white hover:bg-white/20'
                                                }`}
                                            >
                                                {enlace.nombre}
                                            </a>
                                        ) : (
                                            <Link
                                                to={enlace.path}
                                                className={`
                                                    px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center
                                                    ${scrolled 
                                                        ? 'text-gray-700 hover:bg-gray-100' 
                                                        : 'text-white hover:bg-white/20'
                                                    }
                                                `}
                                                onClick={() => setSubmenuOpen(null)}
                                            >
                                                {enlace.nombre}
                                                {enlace.submenus && (
                                                    <ChevronDown size={16} className="ml-1" />
                                                )}
                                            </Link>
                                        )}
                                        
                                        {/* Submenu dropdown */}
                                        {enlace.submenus && (
                                            <div className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white hidden group-hover:block z-20">
                                                <div className="py-1">
                                                    {enlace.submenus.map((submenu) => (
                                                        <Link
                                                            key={submenu.path}
                                                            to={submenu.path}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            {submenu.nombre}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                            
                            {/* Search button */}
                            <button 
                                onClick={toggleSearch}
                                className={`p-2 rounded-full transition-colors ${
                                    scrolled 
                                        ? 'text-gray-700 hover:bg-gray-100' 
                                        : 'text-white hover:bg-white/20'
                                }`}
                                aria-label="Buscar"
                            >
                                <Search size={18} />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center space-x-2 md:hidden">
                            <button 
                                onClick={toggleSearch}
                                className={`p-2 rounded-full transition-colors ${
                                    scrolled 
                                        ? 'text-gray-700 hover:bg-gray-100' 
                                        : 'text-white hover:bg-white/20'
                                }`}
                                aria-label="Buscar"
                            >
                                <Search size={18} />
                            </button>
                            <button
                                className={`p-2 rounded-full transition-colors ${
                                    scrolled 
                                        ? 'text-gray-700 hover:bg-gray-100' 
                                        : 'text-white hover:bg-white/20'
                                }`}
                                onClick={toggleMenu}
                                aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                            >
                                {menuAbierto ? (
                                    <X size={20} />
                                ) : (
                                    <Menu size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Search bar */}
                    <AnimatePresence>
                        {searchOpen && (
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={searchBarVariants}
                                transition={{ duration: 0.2 }}
                                className="pt-4"
                            >
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Buscar en el sitio..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`w-full px-4 py-2 rounded-l-md focus:outline-none ${
                                            scrolled 
                                                ? 'bg-gray-100 text-gray-800' 
                                                : 'bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/30'
                                        }`}
                                    />
                                    <button
                                        onClick={handleSearchSubmit}
                                        className={`px-4 py-2 rounded-r-md ${
                                            scrolled 
                                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                                : 'bg-white/30 text-white hover:bg-white/40'
                                        } transition-colors`}
                                    >
                                        <Search size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {menuAbierto && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                            transition={{ duration: 0.2 }}
                            className="md:hidden bg-white shadow-md overflow-hidden"
                        >
                            <nav className="container mx-auto px-4 py-3">
                                <div className="divide-y divide-gray-100">
                                    {enlaces.map((enlace) => (
                                        <div key={enlace.path} className="py-2">
                                            {enlace.external ? (
                                                <a
                                                    href={enlace.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block py-2 px-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg"
                                                    onClick={() => setMenuAbierto(false)}
                                                >
                                                    {enlace.nombre}
                                                </a>
                                            ) : (
                                                <>
                                                    <div className="flex justify-between items-center">
                                                        <Link
                                                            to={enlace.path}
                                                            className="py-2 px-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg flex-grow"
                                                            onClick={() => {
                                                                if (!enlace.submenus) {
                                                                    setMenuAbierto(false);
                                                                }
                                                            }}
                                                        >
                                                            {enlace.nombre}
                                                        </Link>
                                                        
                                                        {enlace.submenus && (
                                                            <button
                                                                className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                                                                onClick={() => setSubmenuOpen(
                                                                    submenuOpen === enlace.path ? null : enlace.path
                                                                )}
                                                            >
                                                                <ChevronDown 
                                                                    size={18} 
                                                                    className={`transform transition-transform ${
                                                                        submenuOpen === enlace.path ? 'rotate-180' : ''
                                                                    }`} 
                                                                />
                                                            </button>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Mobile submenu */}
                                                    {enlace.submenus && submenuOpen === enlace.path && (
                                                        <div className="pl-4 mt-1 border-l-2 border-blue-100">
                                                            {enlace.submenus.map((submenu) => (
                                                                <Link
                                                                    key={submenu.path}
                                                                    to={submenu.path}
                                                                    className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg text-sm"
                                                                    onClick={() => setMenuAbierto(false)}
                                                                >
                                                                    {submenu.nombre}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                    
                                    {/* Mobile quick links */}
                                    <div className="py-3">
                                        <div className="text-xs text-gray-500 px-3 mb-2">Enlaces rápidos</div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link to="/municipio-transparente/tramites" className="py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                                                Trámites Online
                                            </Link>
                                            <a href="tel:+542652493025" className="py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                                                <PhoneCall size={14} className="mr-1" />
                                                (02652) 493 025
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default EnhancedHeader;