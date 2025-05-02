// Componente para mostrar widget de clima
// src/components/clima/ClimaWidget.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Sun, Clock, ThermometerSun, Wind } from 'lucide-react';

const ClimaWidget = ({ temperatura, humedad, fechaActualizacion, nombreEstacion }) => {
    const [hora, setHora] = useState('');
    const [icono, setIcono] = useState(<Sun />);

    useEffect(() => {
        // Formatear la fecha y hora
        const formatearFechaHora = () => {
            if (!fechaActualizacion) return '';

            try {
                // El formato viene como "01/05/2025 11:30:00 p.m."
                const partes = fechaActualizacion.split(' ');
                const fecha = partes[0];
                const hora = partes[1];
                const ampm = partes[2];

                return `${hora} ${ampm}`;
            } catch (error) {
                console.error("Error parseando fecha:", error);
                return fechaActualizacion;
            }
        };

        // Determinar el icono según la hora del día
        const determinarIcono = () => {
            if (!fechaActualizacion) return <Sun />;

            try {
                const horaNum = parseInt(fechaActualizacion.split(' ')[1].split(':')[0]);
                const esPM = fechaActualizacion.includes('p.m.');

                // Convertir a formato 24h para comparar
                const hora24 = esPM && horaNum !== 12 ? horaNum + 12 : horaNum;

                if (hora24 >= 6 && hora24 < 10) {
                    return <Sun className="text-amber-500" />;
                } else if (hora24 >= 10 && hora24 < 17) {
                    return <ThermometerSun className="text-orange-500" />;
                } else if (hora24 >= 17 && hora24 < 20) {
                    return <Sun className="text-amber-500" />;
                } else {
                    return <Cloud className="text-blue-500" />;
                }
            } catch (error) {
                console.error("Error determinando icono:", error);
                return <Sun className="text-amber-500" />;
            }
        };

        setHora(formatearFechaHora());
        setIcono(determinarIcono());
    }, [fechaActualizacion]);

    // Formatear la humedad para mostrar
    const formatearHumedad = (hum) => {
        if (!hum) return '--';
        return `${hum.replace(',', '.')}%`;
    };

    // Formatear temperatura para mostrar
    const formatearTemperatura = (temp) => {
        if (!temp) return '--°C';
        return `${temp.replace(',', '.')}°C`;
    };

    return (
        <div className="clima-widget">
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                <Cloud size={20} /> Clima Actual
            </h3>

            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-5xl font-bold text-blue-800"
                >
                    {formatearTemperatura(temperatura)}
                </motion.div>

                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full"
                >
                    {icono}
                </motion.div>
            </div>

            <div className="mt-4 space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                    <Droplets size={16} className="text-blue-500" />
                    <span>Humedad: {formatearHumedad(humedad)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" />
                    <span>Actualizado: {hora}</span>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                    Estación Meteorológica: {nombreEstacion}
                </div>
            </div>

            <a
                href="/vivir-el-trapiche#clima"
                className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
                Ver pronóstico completo
            </a>
        </div>
    );
};

export default ClimaWidget;