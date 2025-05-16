// Página de Municipio Transparente
// src/pages/MunicipioTransparente.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Landmark, Search, Download } from 'lucide-react';

// Componentes
import Hero from '../components/common/Hero';
import AutoridadesGrid from '../components/gobierno/AutoridadesGrid';
import OrdenanzasList from '../components/gobierno/OrdenanzasList';
import TramitesOnline from '../components/gobierno/TramitesOnline';

const MunicipioTransparente = () => {
    const [seccionActiva, setSeccionActiva] = useState('autoridades');
    const [busqueda, setBusqueda] = useState('');

    // Cambiar sección activa
    const cambiarSeccion = (seccion) => {
        setSeccionActiva(seccion);
    };

    // Manejar búsqueda
    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    // Definir secciones disponibles
    const secciones = [
        { id: 'autoridades', nombre: 'Autoridades', icono: <Users size={20} /> },
        { id: 'ordenanzas', nombre: 'Ordenanzas', icono: <FileText size={20} /> },
        { id: 'tramites', nombre: 'Trámites Online', icono: <Landmark size={20} /> }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero con imagen de fondo */}
            <Hero
                imageSrc="assets/images/municipalidad.jpg"
                title="Municipio Transparente"
                subtitle="Accedé a información pública, documentos oficiales y trámites digitales"
                height="medium"
            />

            {/* Contenido principal */}
            <section className="container mx-auto px-4 py-12">
                {/* Barra de navegación de secciones */}
                <div className="bg-white rounded-lg shadow-md p-2 mb-8 flex flex-wrap">
                    {secciones.map((seccion) => (
                        <button
                            key={seccion.id}
                            className={`px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${seccionActiva === seccion.id
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                } flex-grow sm:flex-grow-0 text-sm sm:text-base`}
                            onClick={() => cambiarSeccion(seccion.id)}
                        >
                            {seccion.icono}
                            {seccion.nombre}
                        </button>
                    ))}

                    {/* Buscador */}
                    <div className="flex-grow mt-2 sm:mt-0 sm:ml-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={busqueda}
                                onChange={handleBusqueda}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Contenido de la sección activa */}
                <motion.div
                    key={seccionActiva}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {seccionActiva === 'autoridades' && (
                        <AutoridadesGrid busqueda={busqueda} />
                    )}

                    {seccionActiva === 'ordenanzas' && (
                        <OrdenanzasList busqueda={busqueda} />
                    )}

                    {seccionActiva === 'tramites' && (
                        <TramitesOnline busqueda={busqueda} />
                    )}
                </motion.div>
            </section>

            {/* Sección de documentos destacados */}
            <section className="bg-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Documentos destacados</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Presupuesto Municipal 2025</h3>
                            <p className="text-gray-600 mb-4">Documento oficial con el detalle de ingresos y gastos proyectados para el año fiscal.</p>
                            <a
                                href="/assets/documents/presupuesto-2025.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
                            >
                                <Download size={18} /> Descargar PDF
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Plan de Obras Públicas</h3>
                            <p className="text-gray-600 mb-4">Detalle de las obras en ejecución y proyectadas para el desarrollo urbano.</p>
                            <a
                                href="/assets/documents/plan-obras-2025.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
                            >
                                <Download size={18} /> Descargar PDF
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Informe de Gestión</h3>
                            <p className="text-gray-600 mb-4">Balance anual de los logros y desafíos de la administración municipal.</p>
                            <a
                                href="/assets/documents/informe-gestion-2024.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
                            >
                                <Download size={18} /> Descargar PDF
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MunicipioTransparente;