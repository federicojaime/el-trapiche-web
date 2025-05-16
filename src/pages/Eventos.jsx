// Página de Eventos
// src/pages/Eventos.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin ,Search, Filter, Calendar as CalendarIcon } from 'lucide-react';

// Componentes
import Hero from '../components/common/Hero';
import EventoCard from '../components/eventos/EventoCard';
import CalendarioEventos from '../components/eventos/CalendarioEventos';

// API
import { obtenerProximosEventos } from '../api/eventosService';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [vistaCalendario, setVistaCalendario] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

    // Cargar eventos
    useEffect(() => {
        const cargarEventos = async () => {
            try {
                // Obtener todos los eventos (en producción usaríamos paginación)
                const eventosData = await obtenerProximosEventos(12);
                setEventos(eventosData);
                setEventosFiltrados(eventosData);
            } catch (error) {
                console.error("Error cargando eventos:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarEventos();
    }, []);

    // Filtrar eventos según búsqueda y categoría
    useEffect(() => {
        let resultados = eventos;

        // Filtrar por búsqueda
        if (busqueda.trim()) {
            const terminoBusqueda = busqueda.toLowerCase();
            resultados = resultados.filter(evento =>
                evento.titulo.toLowerCase().includes(terminoBusqueda) ||
                (evento.descripcion && evento.descripcion.toLowerCase().includes(terminoBusqueda)) ||
                (evento.lugar && evento.lugar.toLowerCase().includes(terminoBusqueda))
            );
        }

        // Filtrar por categoría
        if (categoriaSeleccionada !== 'todos') {
            resultados = resultados.filter(evento => evento.categoria === categoriaSeleccionada);
        }

        setEventosFiltrados(resultados);
    }, [busqueda, categoriaSeleccionada, eventos]);

    // Manejar cambio en el input de búsqueda
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    // Cambiar entre vista de lista y calendario
    const toggleVistaCalendario = () => {
        setVistaCalendario(!vistaCalendario);
    };

    // Categorías de eventos
    const categorias = [
        { id: 'todos', nombre: 'Todos' },
        { id: 'cultural', nombre: 'Cultural' },
        { id: 'deportivo', nombre: 'Deportivo' },
        { id: 'tradicional', nombre: 'Tradicional' },
        { id: 'municipal', nombre: 'Municipal' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero con imagen de fondo */}
            <Hero
                imageSrc="assets/images/eventos/fiesta-rios.jpg"
                title="Agenda de Eventos"
                subtitle="Descubre todas las actividades y festividades de El Trapiche"
                height="medium"
            />

            {/* Contenido principal */}
            <section className="container mx-auto px-4 py-12">
                {/* Barra de filtros y búsqueda */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                placeholder="Buscar eventos..."
                                value={busqueda}
                                onChange={handleBusquedaChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <div className="flex items-center gap-2">

                            <span className="text-gray-600 hidden md:inline">Filtrar:</span>

                            <div className="relative inline-block">
                                <select
                                    value={categoriaSeleccionada}
                                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                                <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            <button
                                onClick={toggleVistaCalendario}
                                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${vistaCalendario
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <CalendarIcon size={18} />
                                <span className="hidden md:inline">Calendario</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Vista de eventos: Lista o Calendario */}
                {vistaCalendario ? (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendario de eventos</h2>
                        <CalendarioEventos eventos={eventosFiltrados} />
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Próximos eventos</h2>

                        {cargando ? (
                            // Estado de carga
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                                        <div className="bg-white p-4 rounded-b-lg space-y-2">
                                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : eventosFiltrados.length > 0 ? (
                            // Lista de eventos
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {eventosFiltrados.map((evento, index) => (
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
                                ))}
                            </div>
                        ) : (
                            // Mensaje sin resultados
                            <div className="text-center py-16 bg-white rounded-lg shadow-md">
                                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron eventos</h3>
                                <p className="text-gray-600 mb-4">
                                    No hay eventos que coincidan con tu búsqueda o filtros seleccionados.
                                </p>
                                <button
                                    onClick={() => { setBusqueda(''); setCategoriaSeleccionada('todos'); }}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Ver todos los eventos
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Sección de eventos destacados */}
            <section className="bg-blue-50 py-12 mt-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Eventos anuales destacados</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="assets/images/eventos/fiesta-rios.jpg"
                                alt="Fiesta Provincial de los Ríos"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Fiesta Provincial de los Ríos
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    El evento principal de la temporada estival. Celebrado desde 1984, incluye
                                    música, deportes acuáticos y la tradicional elección de la reina.
                                </p>
                                <div className="text-sm text-gray-700 mb-4">
                                    <div className="flex items-center gap-1 mb-1">
                                        <Calendar size={16} className="text-blue-500" />
                                        <span>Enero - Febrero</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} className="text-blue-500" />
                                        <span>Costanera del Río Trapiche</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="assets/images/eventos/festival-pescador.jpg"
                                alt="Festival del Pescador"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Festival del Pescador
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Concurso de pesca deportiva en el Embalse La Florida,
                                    con premiación, festival gastronómico y shows musicales.
                                </p>
                                <div className="text-sm text-gray-700 mb-4">
                                    <div className="flex items-center gap-1 mb-1">
                                        <Calendar size={16} className="text-blue-500" />
                                        <span>Febrero</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} className="text-blue-500" />
                                        <span>Embalse La Florida</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="assets/images/eventos/semana-estudiante.jpg"
                                alt="Semana del Estudiante"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Semana del Estudiante
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Gran encuentro juvenil a la vera del río con actividades
                                    deportivas, artísticas y música en vivo.
                                </p>
                                <div className="text-sm text-gray-700 mb-4">
                                    <div className="flex items-center gap-1 mb-1">
                                        <Calendar size={16} className="text-blue-500" />
                                        <span>21 de Septiembre</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} className="text-blue-500" />
                                        <span>Balneario Municipal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de información para organizadores */}
            <section className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Organizas un evento?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-700 mb-4">
                                Si estás interesado en organizar un evento en El Trapiche, la municipalidad ofrece
                                diversos espacios y apoyo logístico para actividades culturales, deportivas y sociales.
                            </p>

                            <h3 className="text-lg font-bold text-gray-800 mb-3">Espacios disponibles:</h3>
                            <ul className="space-y-2 text-gray-700 mb-6">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>Salón Municipal (capacidad 300 personas)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>Anfiteatro al aire libre (capacidad 500 personas)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>Plaza Central (eventos públicos)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>Costanera (ferias y exposiciones)</span>
                                </li>
                            </ul>

                            <a
                                href="/contacto"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Contactar para más información
                            </a>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Requisitos para organizar eventos:</h3>

                            <ol className="space-y-4">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                        <span className="text-blue-700 font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Solicitud formal</h4>
                                        <p className="text-sm text-gray-600">
                                            Presentar nota con detalles del evento (fecha, horario, tipo de actividad)
                                            con al menos 30 días de anticipación.
                                        </p>
                                    </div>
                                </li>

                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                        <span className="text-blue-700 font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Permisos</h4>
                                        <p className="text-sm text-gray-600">
                                            Obtener habilitaciones correspondientes según el tipo de evento
                                            (SADAIC, seguridad, bomberos, etc.).
                                        </p>
                                    </div>
                                </li>

                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                        <span className="text-blue-700 font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Seguros y garantías</h4>
                                        <p className="text-sm text-gray-600">
                                            Contar con seguros de responsabilidad civil y garantía para
                                            posibles daños en instalaciones.
                                        </p>
                                    </div>
                                </li>

                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                        <span className="text-blue-700 font-bold">4</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Plan de contingencia</h4>
                                        <p className="text-sm text-gray-600">
                                            Presentar plan de seguridad y emergencias para eventos con
                                            asistencia masiva.
                                        </p>
                                    </div>
                                </li>
                            </ol>

                            <div className="mt-4 text-sm text-gray-500">
                                Para más información sobre requisitos y disponibilidad,
                                contactar a la Secretaría de Cultura y Turismo.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Eventos;