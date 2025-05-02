// Componente para visualización detallada del clima
// src/components/clima/ClimaDetallado.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, CloudRain, Cloud, Wind, Droplets, ThermometerSun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatearValor } from '../../api/climaService';

const ClimaDetallado = ({ datosClima, pronostico = [] }) => {
    const [diaSeleccionado, setDiaSeleccionado] = useState(0);

    // Datos para el gráfico (simulados)
    const [datosGrafico, setDatosGrafico] = useState([]);

    useEffect(() => {
        // En producción, estos datos vendrían de la API
        const horas = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
        const temperaturas = [7, 6, 5, 8, 12, 14, 11, 9];
        const humedades = [90, 92, 95, 85, 70, 65, 75, 85];

        const datos = horas.map((hora, index) => ({
            hora,
            temperatura: temperaturas[index],
            humedad: humedades[index]
        }));

        setDatosGrafico(datos);
    }, []);

    // Obtener icono según condición climática
    const obtenerIcono = (condicion) => {
        switch (condicion?.toLowerCase()) {
            case 'soleado':
                return <Sun size={32} className="text-yellow-500" />;
            case 'parcialmente nublado':
                return <Cloud size={32} className="text-gray-400" />;
            case 'nublado':
                return <Cloud size={32} className="text-gray-500" />;
            case 'lluvia':
            case 'lluvioso':
                return <CloudRain size={32} className="text-blue-500" />;
            default:
                return <Sun size={32} className="text-yellow-500" />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Panel principal con datos actuales */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Clima en El Trapiche</h2>
                        <p className="text-blue-100">
                            Actualizado: {datosClima?.fecha || 'Cargando...'}
                        </p>
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center">
                        <div className="mr-4 text-center">
                            <span className="block text-5xl font-bold">
                                {formatearValor(datosClima?.temp)}°C
                            </span>
                            <span className="text-blue-100">Temperatura</span>
                        </div>

                        {obtenerIcono('soleado')}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                        <Droplets className="inline-block mb-1 text-blue-200" />
                        <div className="text-lg font-bold">{formatearValor(datosClima?.hh)}%</div>
                        <div className="text-xs text-blue-100">Humedad</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                        <Wind className="inline-block mb-1 text-blue-200" />
                        <div className="text-lg font-bold">12 km/h</div>
                        <div className="text-xs text-blue-100">Viento</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                        <Sun className="inline-block mb-1 text-blue-200" />
                        <div className="text-lg font-bold">{datosClima?.CrepusculoMatutino}</div>
                        <div className="text-xs text-blue-100">Amanecer</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                        <Moon className="inline-block mb-1 text-blue-200" />
                        <div className="text-lg font-bold">{datosClima?.CrepusculoVespertino}</div>
                        <div className="text-xs text-blue-100">Atardecer</div>
                    </div>
                </div>
            </div>

            {/* Gráfico de temperatura y humedad */}
            <div className="p-4 border-b">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Temperatura durante el día</h3>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={datosGrafico}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hora" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="temperatura"
                                stroke="#3b82f6"
                                activeDot={{ r: 8 }}
                                name="Temperatura (°C)"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="humedad"
                                stroke="#475569"
                                name="Humedad (%)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pronóstico para próximos días */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Pronóstico 3 días</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {pronostico.map((dia, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`p-4 rounded-lg cursor-pointer transition-colors ${diaSeleccionado === index
                                    ? 'bg-blue-50 border border-blue-200'
                                    : 'bg-white border hover:bg-gray-50'
                                }`}
                            onClick={() => setDiaSeleccionado(index)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold">{dia.fecha}</h4>
                                {obtenerIcono(dia.estado)}
                            </div>

                            <p className="text-sm text-gray-600 mb-3">{dia.estado}</p>

                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-blue-800 font-bold text-lg">{formatearValor(dia.tempMax)}°</span>
                                    <span className="text-gray-400 ml-1 text-sm">/ {formatearValor(dia.tempMin)}°</span>
                                </div>

                                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                    {dia.probLluvia}% lluvia
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClimaDetallado;