// Componente de mapa interactivo para visualizar puntos turísticos
// src/components/mapa/MapaInteractivo.jsx

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Map, Navigation, Mountain, Waves, Camera, Sun, Bird, Info } from 'lucide-react';
import { motion } from 'framer-motion';

// En producción, importar correctamente estas dependencias
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const MapaInteractivo = ({ puntos = [], categoriaInicial = 'todos' }) => {
    const [puntosVisibles, setPuntosVisibles] = useState([]);
    const [categoriaActiva, setCategoriaActiva] = useState(categoriaInicial);
    const [mapaListo, setMapaListo] = useState(false);
    const [puntoSeleccionado, setPuntoSeleccionado] = useState(null);
    const mapaRef = useRef(null);

    // Categorías disponibles para filtrar puntos
    const categorias = [
        { id: 'todos', nombre: 'Todos', icono: <Map size={20} /> },
        { id: 'embalses', nombre: 'Embalses', icono: <Waves size={20} /> },
        { id: 'miradores', nombre: 'Miradores', icono: <Mountain size={20} /> },
        { id: 'balnearios', nombre: 'Balnearios', icono: <Sun size={20} /> },
        { id: 'avistaje', nombre: 'Avistaje', icono: <Bird size={20} /> },
        { id: 'camping', nombre: 'Camping', icono: <Navigation size={20} /> }
    ];

    // Filtrar puntos cuando cambia la categoría
    useEffect(() => {
        if (categoriaActiva === 'todos') {
            setPuntosVisibles(puntos);
        } else {
            setPuntosVisibles(puntos.filter(punto => punto.categoria === categoriaActiva));
        }
        // Cerrar popup al cambiar categoría
        setPuntoSeleccionado(null);
    }, [categoriaActiva, puntos]);

    // Simular inicialización del mapa 
    // En producción, usar Leaflet u otra biblioteca
    useEffect(() => {
        const inicializarMapa = () => {
            // Aquí inicializaríamos Leaflet
            setTimeout(() => {
                setMapaListo(true);
            }, 1000);
        };

        inicializarMapa();
    }, []);

    // Función para centrar el mapa en un punto
    const centrarEn = (punto) => {
        // En producción, usaríamos el API real de Leaflet
        // const map = mapaRef.current;
        // if (map) {
        //   map.setView(punto.coordenadas, 15);
        // }

        setPuntoSeleccionado(punto);
    };

    // Función para cambiar categoría
    const cambiarCategoria = (id) => {
        setCategoriaActiva(id);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Barra de filtros por categoría */}
            <div className="p-3 bg-gray-50 border-b flex overflow-x-auto">
                {categorias.map((categoria) => (
                    <button
                        key={categoria.id}
                        className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-1 mr-2 whitespace-nowrap transition-colors ${categoriaActiva === categoria.id
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        onClick={() => cambiarCategoria(categoria.id)}
                    >
                        {categoria.icono}
                        {categoria.nombre}
                    </button>
                ))}
            </div>

            {/* Contenedor del mapa */}
            <div className="relative">
                {/* Mapa simulado - En producción, usar <MapContainer> de react-leaflet */}
                <div
                    className="h-[500px] bg-blue-50 flex items-center justify-center"
                    ref={mapaRef}
                >
                    {!mapaListo ? (
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <p>Cargando mapa...</p>
                        </div>
                    ) : puntosVisibles.length === 0 ? (
                        <div className="text-center p-4">
                            <Info size={40} className="text-blue-300 mx-auto mb-2" />
                            <p className="text-gray-500">No hay puntos en esta categoría</p>
                        </div>
                    ) : (
                        <>
                            {/* Aquí iría el mapa real en producción */}
                            <img
                                src="assets/images/mapa-el-trapiche.jpg"
                                alt="Mapa de El Trapiche"
                                className="w-full h-full object-cover opacity-50"
                            />

                            {/* Puntos simulados en el mapa */}
                            {puntosVisibles.map((punto) => (
                                <div
                                    key={punto.id}
                                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                                    style={{
                                        left: `${30 + Math.random() * 40}%`,
                                        top: `${30 + Math.random() * 40}%`
                                    }}
                                    onClick={() => centrarEn(punto)}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${categoriaActiva === 'todos'
                                                ? punto.categoria === 'embalses' ? 'bg-blue-500'
                                                    : punto.categoria === 'miradores' ? 'bg-green-500'
                                                        : punto.categoria === 'balnearios' ? 'bg-yellow-500'
                                                            : punto.categoria === 'avistaje' ? 'bg-purple-500'
                                                                : 'bg-red-500'
                                                : 'bg-blue-500'
                                            }`}
                                    >
                                        <MapPin size={18} className="text-white" />
                                    </div>
                                    <p className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-bold bg-white px-2 py-1 rounded shadow text-center whitespace-nowrap">
                                        {punto.nombre}
                                    </p>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Panel de información del punto seleccionado */}
                {puntoSeleccionado && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 left-4 right-4 md:left-auto md:w-72 bg-white rounded-lg shadow-lg p-4"
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            onClick={() => setPuntoSeleccionado(null)}
                        >
                            ×
                        </button>

                        <h3 className="font-bold text-lg mb-1">{puntoSeleccionado.nombre}</h3>
                        <p className="text-gray-600 text-sm mb-3">{puntoSeleccionado.descripcion}</p>

                        <a
                            href={`/turismo/${puntoSeleccionado.id}`}
                            className="inline-block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        >
                            Ver detalles
                        </a>
                    </motion.div>
                )}
            </div>

            {/* Leyenda del mapa */}
            <div className="p-3 bg-gray-50 border-t flex flex-wrap gap-3">
                <span className="text-sm text-gray-500">Leyenda:</span>

                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-xs text-gray-600">Embalses</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-xs text-gray-600">Miradores</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="text-xs text-gray-600">Balnearios</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="text-xs text-gray-600">Avistaje</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-xs text-gray-600">Camping</span>
                </div>
            </div>
        </div>
    );
};

export default MapaInteractivo;