// Componente de cabecera con navegación
// src/components/common/Header.jsx

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detectar scroll para cambiar estilos del header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    // Enlaces del menú principal
    const enlaces = [
        { nombre: 'Inicio', path: '/' },
        { nombre: 'Municipio', path: '/municipio-transparente' },
        { nombre: 'Vivir El Trapiche', path: '/vivir-el-trapiche' },
        { nombre: 'Turismo', path: '/turismo' },
        { nombre: 'Eventos', path: '/eventos' },
        { nombre: 'Cómo Llegar', path: '/como-llegar' },
        { nombre: 'Contacto', path: '/contacto' },
    ];

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center">
                        <img
                            src="/assets/images/logo-municipalidad.svg"
                            alt="Municipalidad de El Trapiche"
                            className="h-12 md:h-16"
                        />
                        <div className={`ml-3 transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                            <h1 className="text-xl font-bold leading-tight">Municipalidad</h1>
                            <h2 className="text-sm font-medium">El Trapiche</h2>
                        </div>
                    </NavLink>

                    {/* Menú de navegación - Escritorio */}
                    <nav className="hidden md:flex space-x-6">
                        {enlaces.map((enlace) => (
                            <NavLink
                                key={enlace.path}
                                to={enlace.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium py-2 border-b-2 transition-colors ${isActive
                                        ? 'border-blue-500 text-blue-600'
                                        : `border-transparent ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-100'}`
                                    }`
                                }
                            >
                                {enlace.nombre}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Botón de menú - Móvil */}
                    <button
                        className="md:hidden"
                        onClick={toggleMenu}
                        aria-label="Abrir menú"
                    >
                        {menuAbierto ? (
                            <X className={scrolled ? 'text-gray-800' : 'text-white'} size={24} />
                        ) : (
                            <Menu className={scrolled ? 'text-gray-800' : 'text-white'} size={24} />
                        )}
                    </button>
                </div>

                {/* Menú móvil */}
                {menuAbierto && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md animate-fadeIn">
                        <nav className="flex flex-col py-3 px-4">
                            {enlaces.map((enlace) => (
                                <NavLink
                                    key={enlace.path}
                                    to={enlace.path}
                                    className={({ isActive }) =>
                                        `py-3 px-4 font-medium border-l-4 ${isActive
                                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                                            : 'border-transparent text-gray-700 hover:bg-gray-50'
                                        }`
                                    }
                                    onClick={() => setMenuAbierto(false)}
                                >
                                    {enlace.nombre}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;