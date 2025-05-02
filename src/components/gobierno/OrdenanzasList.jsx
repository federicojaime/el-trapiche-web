// Componente para listar ordenanzas municipales
// src/components/gobierno/OrdenanzasList.jsx

import React, { useState, useEffect } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';

const OrdenanzasList = ({ busqueda = '' }) => {
    const [ordenanzas, setOrdenanzas] = useState([]);
    const [ordenanzasFiltradas, setOrdenanzasFiltradas] = useState([]);
    const [anioSeleccionado, setAnioSeleccionado] = useState('todos');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

    // Datos de ejemplo para ordenanzas
    useEffect(() => {
        // En producción, obtener desde API
        const ordenanzasEjemplo = [
            {
                id: 1,
                numero: '001/2025',
                titulo: 'Presupuesto Municipal 2025',
                descripcion: 'Aprobación del Presupuesto General de Gastos y Cálculo de Recursos para el ejercicio fiscal 2025.',
                fecha: '2025-01-15',
                categoria: 'Presupuesto',
                anio: '2025',
                url: '/assets/documents/ordenanzas/001-2025.pdf'
            },
            {
                id: 2,
                numero: '002/2025',
                titulo: 'Actualización Tasas Municipales',
                descripcion: 'Modificación de valores de tasas y servicios municipales para el período 2025.',
                fecha: '2025-01-30',
                categoria: 'Tasas',
                anio: '2025',
                url: '/assets/documents/ordenanzas/002-2025.pdf'
            },
            {
                id: 3,
                numero: '003/2025',
                titulo: 'Programa de Reciclaje Municipal',
                descripcion: 'Implementación del programa integral de separación y reciclaje de residuos sólidos urbanos.',
                fecha: '2025-02-10',
                categoria: 'Medio Ambiente',
                anio: '2025',
                url: '/assets/documents/ordenanzas/003-2025.pdf'
            },
            {
                id: 4,
                numero: '004/2025',
                titulo: 'Regulación de Construcciones',
                descripcion: 'Actualización del Código de Edificación y normativa para construcciones en el ejido municipal.',
                fecha: '2025-02-28',
                categoria: 'Urbanismo',
                anio: '2025',
                url: '/assets/documents/ordenanzas/004-2025.pdf'
            },
            {
                id: 5,
                numero: '027/2024',
                titulo: 'Plan Turístico Anual',
                descripcion: 'Aprobación del Plan de Desarrollo Turístico para la temporada 2024-2025.',
                fecha: '2024-11-15',
                categoria: 'Turismo',
                anio: '2024',
                url: '/assets/documents/ordenanzas/027-2024.pdf'
            },
            {
                id: 6,
                numero: '028/2024',
                titulo: 'Adhesión a Programa Provincial',
                descripcion: 'Adhesión al programa provincial de mejoramiento vial para localidades turísticas.',
                fecha: '2024-12-05',
                categoria: 'Obras Públicas',
                anio: '2024',
                url: '/assets/documents/ordenanzas/028-2024.pdf'
            }
        ];

        setOrdenanzas(ordenanzasEjemplo);
        setOrdenanzasFiltradas(ordenanzasEjemplo);
    }, []);

    // Filtrar ordenanzas según búsqueda, año y categoría
    useEffect(() => {
        let resultados = ordenanzas;

        // Filtrar por búsqueda
        if (busqueda.trim()) {
            const terminoBusqueda = busqueda.toLowerCase();
            resultados = resultados.filter(ordenanza =>
                ordenanza.titulo.toLowerCase().includes(terminoBusqueda) ||
                ordenanza.descripcion.toLowerCase().includes(terminoBusqueda) ||
                ordenanza.numero.toLowerCase().includes(terminoBusqueda)
            );
        }

        // Filtrar por año
        if (anioSeleccionado !== 'todos') {
            resultados = resultados.filter(ordenanza => ordenanza.anio === anioSeleccionado);
        }

        // Filtrar por categoría
        if (categoriaSeleccionada !== 'todas') {
            resultados = resultados.filter(ordenanza => ordenanza.categoria === categoriaSeleccionada);
        }

        setOrdenanzasFiltradas(resultados);
    }, [busqueda, anioSeleccionado, categoriaSeleccionada, ordenanzas]);

    // Obtener años disponibles
    const aniosDisponibles = ['todos', ...new Set(ordenanzas.map(o => o.anio))].sort().reverse();

    // Obtener categorías disponibles
    const categoriasDisponibles = ['todas', ...new Set(ordenanzas.map(o => o.categoria))].sort();

    // Formatear fecha
    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ordenanzas Municipales</h2>

            {/* Filtros adicionales */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative">
                    <select
                        value={anioSeleccionado}
                        onChange={(e) => setAnioSeleccionado(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        {aniosDisponibles.map(anio => (
                            <option key={anio} value={anio}>
                                {anio === 'todos' ? 'Todos los años' : `Año ${anio}`}
                            </option>
                        ))}
                    </select>
                    <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative">
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        {categoriasDisponibles.map(categoria => (
                            <option key={categoria} value={categoria}>
                                {categoria === 'todas' ? 'Todas las categorías' : categoria}
                            </option>
                        ))}
                    </select>
                    <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Lista de ordenanzas */}
            {ordenanzasFiltradas.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Número
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Título
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Categoría
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {ordenanzasFiltradas.map((ordenanza) => (
                                    <tr key={ordenanza.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {ordenanza.numero}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div>
                                                <h4 className="font-medium text-gray-900">{ordenanza.titulo}</h4>
                                                <p className="text-gray-500 mt-1">{ordenanza.descripcion}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatearFecha(ordenanza.fecha)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {ordenanza.categoria}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <a
                                                href={ordenanza.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                            >
                                                <Download size={16} />
                                                PDF
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron ordenanzas</h3>
                    <p className="text-gray-600 mb-4">
                        No hay ordenanzas que coincidan con tu búsqueda o filtros seleccionados.
                    </p>
                    <button
                        onClick={() => {
                            setAnioSeleccionado('todos');
                            setCategoriaSeleccionada('todas');
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Ver todas las ordenanzas
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrdenanzasList;