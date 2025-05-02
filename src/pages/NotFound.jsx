// Página de error 404 - No encontrado
// src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-red-600 h-2"></div>

                <div className="p-8 text-center">
                    <h2 className="text-9xl font-bold text-red-600 mb-2">404</h2>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Página no encontrada</h3>

                    <p className="text-gray-600 mb-8">
                        Lo sentimos, la página que intentas buscar no existe o ha sido movida.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            <Home size={18} />
                            Volver al inicio
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Volver atrás
                        </button>
                    </div>

                    <div className="relative mt-8">
                        <input
                            type="text"
                            placeholder="Buscar en el sitio..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="bg-gray-50 p-4 border-t text-center">
                    <p className="text-gray-600 text-sm">
                        ¿Necesitas ayuda? Ponte en contacto con nosotros en{' '}
                        <Link to="/contacto" className="text-blue-600 hover:text-blue-800">
                            la sección de contacto
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;