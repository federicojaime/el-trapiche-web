import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Info, PhoneCall } from 'lucide-react';

const Header = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAnnouncement, setShowAnnouncement] = useState(false);

    const municipalLogo = 'assets/images/logo-blanco.png';
    const municipalLogoAlt = 'assets/images/logo-municipalidad.png';
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
        if (searchOpen) setSearchQuery('');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) console.log('Buscando:', searchQuery);
    };

    const enlaces = [
        { nombre: 'Inicio', path: '/' },
        { nombre: 'Municipio', path: '/municipio-transparente' },
        { nombre: 'Vivir El Trapiche', path: '/vivir-el-trapiche' },
        { nombre: 'Turismo', path: 'https://codeo.site/trapiche-web/', external: true },
        { nombre: 'Cómo Llegar', path: '/como-llegar' },
        { nombre: 'Contacto', path: '/contacto' }
    ];

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
            {/* Barra de anuncios */}
            <AnimatePresence>
                {showAnnouncement && (
                    <div className="bg-blue-600 text-white text-center py-2 px-4 relative">
                        <div className="container mx-auto flex items-center justify-center text-sm md:text-base">
                            <Info size={16} className="mr-2 text-white" />
                            <span>Información importante: Nuevo sistema de trámites online disponible</span>
                            <Link to="/municipio-transparente/tramites" className="ml-2 underline text-white hover:text-blue-100">Más info</Link>
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

            {/* Barra utilidades */}
            <div className={`hidden md:block py-2 text-xs ${scrolled ? 'bg-white text-gray-700' : 'bg-blue-400 backdrop-blur-md text-white'}`}>
                <div className="container mx-auto px-4 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <a href="tel:+542652493025" className="flex items-center hover:underline">
                            <PhoneCall size={14} className="mr-1" />
                            (02652) 493 025
                        </a>
                        <a href="mailto:contacto@eltrapiche.gob.ar" className="hover:underline">contacto@eltrapiche.gob.ar</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/municipio-transparente/tramites" className="hover:underline">Trámites Online</Link>
                        <Link to="/contacto" className="hover:underline">Atención al Ciudadano</Link>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className={`sticky top-0 w-full z-50 transition-all duration-300  ${scrolled ? 'bg-white shadow-md py-3' : 'bg-blue-600 py-4'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <img src={scrolled ? municipalLogoAlt : municipalLogo}
                                alt="Municipalidad de El Trapiche" className="h-20 md:h-17" />
                        </Link>

                        {/* Navegación Escritorio */}
                        <div className="hidden md:flex items-center">
                            <nav className="flex">
                                {enlaces.map((enlace, index) => (
                                    <div key={enlace.path}>
                                        {enlace.external ? (
                                            <a
                                                href={enlace.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-4 py-2 text-sm font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-100'}`}
                                            >
                                                {enlace.nombre}
                                            </a>
                                        ) : (
                                            <Link
                                                to={enlace.path}
                                                className={`px-4 py-2 text-sm font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-100'}`}
                                            >
                                                {enlace.nombre}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Buscar 
                            <button
                                onClick={toggleSearch}
                                className={`ml-2 p-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-100'}`}
                                aria-label="Buscar"
                            >
                                <Search size={18} />
                            </button>*/}
                        </div>

                        {/* Botón móvil */}
                        <div className="flex items-center space-x-2 md:hidden">
                            {/* <button onClick={toggleSearch} className={`p-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-100'}`} aria-label="Buscar">
                                <Search size={18} />
                            </button>*/}
                            <button onClick={toggleMenu} className={`p-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-100'}`} aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}>
                                {menuAbierto ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Barra búsqueda */}
                    <AnimatePresence>
                        {searchOpen && (
                            <motion.div initial="closed" animate="open" exit="closed" variants={searchBarVariants} transition={{ duration: 0.2 }} className="pt-4">
                                <form onSubmit={handleSearchSubmit} className="flex">
                                    <input
                                        type="text"
                                        placeholder="Buscar en el sitio..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={scrolled ? "w-full px-4 py-2 rounded-l-md focus:outline-none bg-gray-100 text-gray-800" : "w-full px-4 py-2 rounded-l-md focus:outline-none bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/30"}
                                    />
                                    {/* 
                                    <button type="submit" className={scrolled ? "px-4 py-2 rounded-r-md bg-blue-600 text-white hover:bg-blue-700 transition-colors" : "px-4 py-2 rounded-r-md bg-white/30 text-white hover:bg-white/40 transition-colors"}>
                                        <Search size={18} />
                                    </button>*/}
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Menú móvil */}
                <AnimatePresence>
                    {menuAbierto && (
                        <motion.div initial="closed" animate="open" exit="closed" variants={mobileMenuVariants} transition={{ duration: 0.2 }} className="md:hidden bg-white shadow-lg overflow-hidden">
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
                                                <Link
                                                    to={enlace.path}
                                                    className="py-2 px-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg"
                                                    onClick={() => setMenuAbierto(false)}
                                                >
                                                    {enlace.nombre}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                    <div className="py-3">
                                        <div className="text-xs text-gray-500 px-3 mb-2">Enlaces rápidos</div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link to="/municipio-transparente/tramites" className="py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Trámites Online</Link>
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

export default Header;