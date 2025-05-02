// Página de inicio
// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Info, ArrowRight } from 'lucide-react';

// Componentes
import Hero from '../components/common/Hero';
import ClimaWidget from '../components/clima/ClimaWidget';
import EventoCard from '../components/eventos/EventoCard';
import AtraccionCard from '../components/turismo/AtraccionCard';

// API
import { obtenerClimaActual } from '../api/climaService';
import { obtenerProximosEventos } from '../api/eventosService';
import { obtenerAtraccionesPrincipales } from '../api/turismService';

const Home = () => {
    const [clima, setClima] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [atracciones, setAtracciones] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [climaData, eventosData, atraccionesData] = await Promise.all([
                    obtenerClimaActual(),
                    obtenerProximosEventos(3),
                    obtenerAtraccionesPrincipales(4)
                ]);

                setClima(climaData);
                setEventos(eventosData);
                setAtracciones(atraccionesData);
            } catch (error) {
                console.error("Error cargando datos iniciales:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
            {/* Hero Section con Video de Fondo */}
            <Hero
                videoSrc="/assets/videos/rio-trapiche-aereo.mp4"
                imageSrc="/assets/images/el-trapiche-vista.jpg" // Fallback image
                title="El Trapiche"
                subtitle="Donde la naturaleza y la tradición se encuentran"
            >
                <div className="flex gap-4 mt-8">
                    <Link
                        to="/turismo"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Descubrir El Trapiche
                    </Link>
                    <Link
                        to="/como-llegar"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/50 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Cómo Llegar
                    </Link>
                </div>
            </Hero>

            {/* Datos Rápidos y Clima */}
            <section className="container mx-auto px-4 -mt-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-md bg-opacity-90"
                    >
                        <h3 className="text-lg font-bold text-sky-800 mb-3 flex items-center gap-2">
                            <Info size={20} /> Sobre El Trapiche
                        </h3>
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-medium">Población:</span> 3.068 habitantes</p>
                            <p><span className="font-medium">Fundación:</span> 12 de diciembre de 1792</p>
                            <p><span className="font-medium">Altitud:</span> 700 metros s.n.m.</p>
                            <p><span className="font-medium">Intendente:</span> Ricardo Olivera Aguirre</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-md bg-opacity-90"
                    >
                        <h3 className="text-lg font-bold text-emerald-700 mb-3 flex items-center gap-2">
                            <MapPin size={20} /> Descubrí El Trapiche
                        </h3>
                        <p className="text-gray-700 mb-4">Villa turística serrana a 39 km de San Luis capital, sobre la RP 9, departamento Coronel Pringles.</p>
                        <Link to="/turismo" className="text-emerald-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            Ver sitios turísticos <ArrowRight size={16} />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-md bg-opacity-90"
                    >
                        {!cargando && clima ? (
                            <ClimaWidget
                                temperatura={clima.temp}
                                humedad={clima.hh}
                                fechaActualizacion={clima.fecha}
                                nombreEstacion={clima.nombre}
                            />
                        ) : (
                            <div className="animate-pulse flex flex-col space-y-3">
                                <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-20 bg-gray-200 rounded"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Eventos Próximos */}
            <section className="container mx-auto px-4 mt-12 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <CalendarDays size={24} className="text-orange-500" />
                        Próximos Eventos
                    </h2>
                    <Link to="/eventos" className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
                        Ver todos <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cargando ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                                <div className="bg-white p-4 rounded-b-lg space-y-2">
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        eventos.map((evento, index) => (
                            <motion.div
                                key={evento.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <EventoCard
                                    titulo={evento.titulo}
                                    fecha={evento.fecha}
                                    imagen={evento.imagen}
                                    descripcion={evento.descripcion}
                                    lugar={evento.lugar}
                                    url={`/eventos/${evento.id}`}
                                />
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            {/* Atracciones Turísticas */}
            <section className="bg-gradient-to-r from-sky-800 to-blue-900 py-12 mt-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-8">Descubre Nuestros Tesoros Naturales</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cargando ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-700 h-48 rounded-lg"></div>
                                    <div className="mt-2 space-y-2">
                                        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            atracciones.map((atraccion, index) => (
                                <motion.div
                                    key={atraccion.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <AtraccionCard
                                        nombre={atraccion.nombre}
                                        imagen={atraccion.imagen}
                                        descripcionCorta={atraccion.descripcionCorta}
                                        url={`/turismo/${atraccion.id}`}
                                        destacado={index === 0}
                                    />
                                </motion.div>
                            ))
                        )}
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/turismo" className="inline-block bg-white text-blue-800 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                            Explorar Todos los Atractivos
                        </Link>
                    </div>
                </div>
            </section>

            {/* Accesos Rápidos */}
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Accesos Rápidos</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/municipio-transparente" className="bg-indigo-50 rounded-lg p-6 text-center hover:bg-indigo-100 transition-colors">
                        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-indigo-600 text-2xl font-bold">MT</span>
                        </div>
                        <h3 className="font-medium text-indigo-900">Municipio Transparente</h3>
                    </Link>

                    <Link to="/vivir-el-trapiche" className="bg-emerald-50 rounded-lg p-6 text-center hover:bg-emerald-100 transition-colors">
                        <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-emerald-600 text-2xl font-bold">VT</span>
                        </div>
                        <h3 className="font-medium text-emerald-900">Vivir El Trapiche</h3>
                    </Link>

                    <Link to="/como-llegar" className="bg-amber-50 rounded-lg p-6 text-center hover:bg-amber-100 transition-colors">
                        <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-amber-600 text-2xl font-bold">CL</span>
                        </div>
                        <h3 className="font-medium text-amber-900">Cómo Llegar</h3>
                    </Link>

                    <Link to="/contacto" className="bg-rose-50 rounded-lg p-6 text-center hover:bg-rose-100 transition-colors">
                        <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-rose-600 text-2xl font-bold">CO</span>
                        </div>
                        <h3 className="font-medium text-rose-900">Contacto</h3>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;