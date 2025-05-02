// Página de "Cómo Llegar"
// src/pages/ComoLlegar.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bus,Phone,Clock, Car, Calendar, AlertCircle, Info } from 'lucide-react';

// Componentes
import Hero from '../components/common/Hero';

const ComoLlegar = () => {
    const [transporteSeleccionado, setTransporteSeleccionado] = useState('autobus');
    const [origen, setOrigen] = useState('sanluis');

    // Cambiar el medio de transporte seleccionado
    const cambiarTransporte = (medio) => {
        setTransporteSeleccionado(medio);
    };

    // Cambiar origen
    const cambiarOrigen = (e) => {
        setOrigen(e.target.value);
    };

    // Datos de horarios de autobuses
    const horariosAutobus = {
        sanluis: [
            { hora: '07:30', empresa: 'Panamericana', dias: 'Lunes a Viernes' },
            { hora: '09:00', empresa: 'María del Rosario', dias: 'Todos los días' },
            { hora: '11:30', empresa: 'Panamericana', dias: 'Lunes a Sábado' },
            { hora: '13:45', empresa: 'María del Rosario', dias: 'Todos los días' },
            { hora: '16:15', empresa: 'Panamericana', dias: 'Lunes a Viernes' },
            { hora: '18:30', empresa: 'María del Rosario', dias: 'Todos los días' },
            { hora: '20:00', empresa: 'Panamericana', dias: 'Viernes y Sábado' }
        ],
        mendoza: [
            { hora: '08:15', empresa: 'Panamericana', dias: 'Martes, Jueves y Sábado' },
            { hora: '15:30', empresa: 'María del Rosario', dias: 'Lunes, Miércoles y Viernes' }
        ],
        cordoba: [
            { hora: '07:00', empresa: 'María del Rosario', dias: 'Lunes, Miércoles y Viernes' },
            { hora: '14:45', empresa: 'Panamericana', dias: 'Martes, Jueves y Domingo' }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero con imagen de fondo */}
            <Hero
                imageSrc="/assets/images/como-llegar/ruta-el-trapiche.jpg"
                title="Cómo Llegar a El Trapiche"
                subtitle="Información sobre rutas, transportes y accesos a nuestra localidad"
                height="medium"
            />

            {/* Contenido principal */}
            <section className="container mx-auto px-4 py-12">
                {/* Selector de medio de transporte */}
                <div className="bg-white rounded-lg shadow-md p-2 mb-8 flex">
                    <button
                        className={`px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors flex-grow ${transporteSeleccionado === 'autobus'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        onClick={() => cambiarTransporte('autobus')}
                    >
                        <Bus size={20} />
                        Autobús
                    </button>

                    <button
                        className={`px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors flex-grow ${transporteSeleccionado === 'auto'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        onClick={() => cambiarTransporte('auto')}
                    >
                        <Car size={20} />
                        Automóvil
                    </button>
                </div>

                {/* Contenido según medio de transporte */}
                <motion.div
                    key={transporteSeleccionado}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                    {transporteSeleccionado === 'autobus' && (
                        <div>
                            <div className="bg-blue-600 text-white p-6">
                                <h2 className="text-2xl font-bold">Horarios de Autobuses</h2>
                                <p className="text-blue-100">Servicios de transporte público hacia El Trapiche</p>
                            </div>

                            <div className="p-6">
                                {/* Selector de origen */}
                                <div className="mb-6">
                                    <label htmlFor="origen" className="block text-gray-700 font-medium mb-2">
                                        Seleccione origen:
                                    </label>
                                    <select
                                        id="origen"
                                        value={origen}
                                        onChange={cambiarOrigen}
                                        className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="sanluis">Desde San Luis Capital</option>
                                        <option value="mendoza">Desde Mendoza</option>
                                        <option value="cordoba">Desde Córdoba</option>
                                    </select>
                                </div>

                                {/* Tabla de horarios */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hora
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Empresa
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Días
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {horariosAutobus[origen].map((horario, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {horario.hora}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {horario.empresa}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {horario.dias}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Notas adicionales */}
                                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <AlertCircle className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                Los horarios pueden variar en feriados y temporada alta. Consulte con las empresas de transporte.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-bold text-blue-800 mb-2">Empresa Panamericana</h3>
                                        <p className="text-gray-600 mb-2">Terminal de San Luis, Box 12</p>
                                        <p className="text-gray-600">Tel: (0266) 445-2010</p>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-bold text-blue-800 mb-2">Empresa María del Rosario</h3>
                                        <p className="text-gray-600 mb-2">Terminal de San Luis, Box 15</p>
                                        <p className="text-gray-600">Tel: (0266) 445-3582</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {transporteSeleccionado === 'auto' && (
                        <div>
                            <div className="bg-blue-600 text-white p-6">
                                <h2 className="text-2xl font-bold">Llegar en Automóvil</h2>
                                <p className="text-blue-100">Rutas y accesos para vehículos particulares</p>
                            </div>

                            <div className="p-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                                        <MapPin size={18} />
                                        Desde San Luis Capital (39 km)
                                    </h3>
                                    <p className="text-gray-700 mb-3">
                                        Tome la Ruta Provincial 9 en dirección noreste. El Trapiche se encuentra a 39 km de la ciudad capital.
                                        El camino es completamente asfaltado y en buen estado.
                                    </p>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Tiempo estimado:</span> 35 minutos
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                                        <MapPin size={18} />
                                        Desde Villa Mercedes (120 km)
                                    </h3>
                                    <p className="text-gray-700 mb-3">
                                        Tome la Autopista RN 7 hacia San Luis Capital. Al llegar a la capital, siga las indicaciones hacia
                                        la Ruta Provincial 9 en dirección a El Trapiche.
                                    </p>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Tiempo estimado:</span> 1 hora 45 minutos
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                                        <MapPin size={18} />
                                        Desde Mendoza (260 km)
                                    </h3>
                                    <p className="text-gray-700 mb-3">
                                        Tome la RN 7 en dirección este hacia San Luis. Al llegar a San Luis Capital, siga las indicaciones
                                        hacia la Ruta Provincial 9 en dirección norte hacia El Trapiche.
                                    </p>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Tiempo estimado:</span> 3 horas 30 minutos
                                    </div>
                                </div>
                                {/* Información sobre estado de rutas */}
                                <div className="bg-white border rounded-lg p-4 mb-6">
                                    <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                                        <Info size={18} className="text-blue-600" />
                                        Estado actual de rutas
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                            <span className="text-gray-800 font-medium">RP 9: </span>
                                            <span className="text-gray-600 ml-2">Buen estado, transitabilidad normal</span>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                            <span className="text-gray-800 font-medium">RP 39: </span>
                                            <span className="text-gray-600 ml-2">Obras en progreso km 15-20, circulación con precaución</span>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                            <span className="text-gray-800 font-medium">Camino perilago: </span>
                                            <span className="text-gray-600 ml-2">Buen estado, apto para todo tipo de vehículos</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-4">
                                        Actualizado: 30/04/2025 - 10:30 hs
                                    </p>
                                </div>

                                {/* Recomendaciones */}
                                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Info className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-green-800">Recomendaciones</h3>
                                            <div className="mt-2 text-sm text-green-700">
                                                <ul className="list-disc pl-5 space-y-1">
                                                    <li>Verifique el pronóstico del tiempo antes de viajar, especialmente en temporada de lluvias.</li>
                                                    <li>Mantenga el tanque de combustible cargado. La estación de servicio más cercana está en la entrada de El Trapiche.</li>
                                                    <li>En caso de emergencia, comuníquese con la Comisaría 17 al (0266) 449-3071.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Mapa de ubicación */}
            <section className="container mx-auto px-4 py-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ubicación</h2>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-[400px] bg-gray-200 relative">
                        {/* Aquí iría el mapa real en producción */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13348.676903097285!2d-66.05738056!3d-33.102925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4394e16867ae9%3A0xbc8d79e1d59d5e5!2sEl%20Trapiche%2C%20San%20Luis!5e0!3m2!1ses!2sar!4v1625120000000!5m2!1ses!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Mapa de El Trapiche"
                        ></iframe>
                    </div>

                    <div className="p-4">
                        <p className="text-gray-600">
                            <MapPin size={16} className="inline-block text-blue-600 mr-1" />
                            El Trapiche se encuentra en el departamento Coronel Pringles, en el noreste de la provincia de San Luis,
                            a 39 km de la capital provincial.
                        </p>
                    </div>
                </div>
            </section>

            {/* Servicios de transporte */}
            <section className="bg-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Servicios locales de transporte</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Remises locales</h3>
                            <p className="text-gray-600 mb-4">Servicio de remises para traslados dentro de la localidad y alrededores.</p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Phone size={16} className="text-blue-500" />
                                    Remises "El Trapiche": (0266) 449-3090
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={16} className="text-blue-500" />
                                    Remises "Serrano": (0266) 449-3121
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Excursiones guiadas</h3>
                            <p className="text-gray-600 mb-4">Tours organizados a los principales atractivos de la zona.</p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-500" />
                                    Salidas: Martes, Jueves y Sábados
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-500" />
                                    Punto de partida: Plaza central
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={16} className="text-blue-500" />
                                    Reservas: (0266) 449-3150
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Alquiler de bicicletas</h3>
                            <p className="text-gray-600 mb-4">Servicio de alquiler de bicicletas para recorrer senderos y circuitos.</p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-500" />
                                    Ubicación: Costanera del Río Trapiche
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock size={16} className="text-blue-500" />
                                    Horario: 9:00 a 18:00 hs
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={16} className="text-blue-500" />
                                    Consultas: (0266) 449-3200
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ComoLlegar;