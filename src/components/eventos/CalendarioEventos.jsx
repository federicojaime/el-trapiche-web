// Componente Calendario de Eventos
// src/components/eventos/CalendarioEventos.jsx

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalendarioEventos = ({ eventos = [] }) => {
    const [fechaActual, setFechaActual] = useState(new Date());
    const [eventosMes, setEventosMes] = useState([]);
    const [diasConEventos, setDiasConEventos] = useState({});
    const [eventosDia, setEventosDia] = useState([]);
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);

    // Obtener eventos del mes actual
    useEffect(() => {
        const filtrarEventosMes = () => {
            const año = fechaActual.getFullYear();
            const mes = fechaActual.getMonth();

            // Filtrar eventos del mes actual
            const eventosFiltrados = eventos.filter(evento => {
                const fechaEvento = new Date(evento.fecha);
                return fechaEvento.getFullYear() === año && fechaEvento.getMonth() === mes;
            });

            setEventosMes(eventosFiltrados);

            // Crear mapa de días con eventos
            const mapaEventos = {};
            eventosFiltrados.forEach(evento => {
                const fechaEvento = new Date(evento.fecha);
                const dia = fechaEvento.getDate();

                if (!mapaEventos[dia]) {
                    mapaEventos[dia] = [];
                }

                mapaEventos[dia].push(evento);
            });

            setDiasConEventos(mapaEventos);

            // Seleccionar día actual si estamos en el mes actual
            const hoy = new Date();
            if (hoy.getFullYear() === año && hoy.getMonth() === mes) {
                setDiaSeleccionado(hoy.getDate());
                setEventosDia(mapaEventos[hoy.getDate()] || []);
            } else {
                setDiaSeleccionado(null);
                setEventosDia([]);
            }
        };

        filtrarEventosMes();
    }, [fechaActual, eventos]);

    // Cambiar al mes anterior
    const mesAnterior = () => {
        setFechaActual(prevFecha => {
            const nuevaFecha = new Date(prevFecha);
            nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
            return nuevaFecha;
        });
    };

    // Cambiar al mes siguiente
    const mesSiguiente = () => {
        setFechaActual(prevFecha => {
            const nuevaFecha = new Date(prevFecha);
            nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
            return nuevaFecha;
        });
    };

    // Seleccionar un día
    const seleccionarDia = (dia) => {
        setDiaSeleccionado(dia);
        setEventosDia(diasConEventos[dia] || []);
    };

    // Obtener nombre del mes
    const nombreMes = fechaActual.toLocaleString('es-AR', { month: 'long' });

    // Obtener año
    const año = fechaActual.getFullYear();

    // Obtener el primer día del mes (0: domingo, 1: lunes, ..., 6: sábado)
    const primerDiaMes = new Date(año, fechaActual.getMonth(), 1).getDay();

    // Obtener el número de días en el mes
    const diasEnMes = new Date(año, fechaActual.getMonth() + 1, 0).getDate();

    // Generar array con los días del mes
    const diasMes = Array.from({ length: diasEnMes }, (_, i) => i + 1);

    // Generar array con días vacíos para alinear el calendario
    const diasVacios = Array.from({ length: primerDiaMes }, (_, i) => i);

    // Formatear fecha para mostrar
    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-AR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendario */}
            <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    {/* Encabezado del calendario */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={mesAnterior}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <h3 className="text-xl font-bold capitalize">{nombreMes} {año}</h3>

                        <button
                            onClick={mesSiguiente}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map((dia, i) => (
                            <div key={i} className="text-center text-gray-600 font-medium py-2 text-sm">
                                {dia}
                            </div>
                        ))}
                    </div>

                    {/* Grilla de días */}
                    <div className="grid grid-cols-7 gap-1">
                        {/* Días vacíos para alinear */}
                        {diasVacios.map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square bg-gray-50 rounded-lg"></div>
                        ))}

                        {/* Días del mes */}
                        {diasMes.map((dia) => {
                            const tieneEventos = diasConEventos[dia] && diasConEventos[dia].length > 0;
                            const esHoy = new Date().getDate() === dia &&
                                new Date().getMonth() === fechaActual.getMonth() &&
                                new Date().getFullYear() === fechaActual.getFullYear();
                            const esDiaSeleccionado = diaSeleccionado === dia;

                            return (
                                <button
                                    key={`day-${dia}`}
                                    className={`aspect-square rounded-lg flex flex-col items-center justify-center relative 
                 ${tieneEventos ? 'cursor-pointer' : 'cursor-default'} 
                 ${esHoy ? 'bg-blue-50 border border-blue-200' : 'bg-white hover:bg-gray-50'} 
                 ${esDiaSeleccionado ? 'ring-2 ring-blue-400' : ''}`}
                                    onClick={() => tieneEventos && seleccionarDia(dia)}
                                >
                                    <span className={`text-lg ${tieneEventos ? 'font-bold text-blue-700' : 'text-gray-700'}`}>
                                        {dia}
                                    </span>

                                    {tieneEventos && (
                                        <div className="absolute bottom-1 flex gap-1">
                                            {[...Array(Math.min(3, diasConEventos[dia].length))].map((_, i) => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-4 flex justify-center">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm text-gray-600">Eventos programados</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                <span className="text-sm text-gray-600">Sin eventos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de eventos del día seleccionado */}
            <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 h-full">
                    {diaSeleccionado ? (
                        <>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">
                                Eventos del {diaSeleccionado} de {nombreMes}
                            </h3>

                            {eventosDia.length > 0 ? (
                                <div className="space-y-4">
                                    {eventosDia.map((evento) => (
                                        <div key={evento.id} className="border-l-4 border-blue-500 pl-3 py-1">
                                            <h4 className="font-bold text-gray-800">{evento.titulo}</h4>
                                            <p className="text-sm text-gray-600 mb-1">{formatearFecha(evento.fecha)}</p>
                                            {evento.lugar && (
                                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                    {evento.lugar}
                                                </p>
                                            )}
                                            <Link
                                                to={`/eventos/${evento.id}`}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
                                            >
                                                Ver detalles
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <CalendarIcon size={36} className="text-gray-300 mb-2" />
                                    <p className="text-gray-500">No hay eventos programados para este día</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <CalendarIcon size={36} className="text-gray-300 mb-2" />
                            <p className="text-gray-500">Selecciona un día para ver los eventos</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarioEventos;