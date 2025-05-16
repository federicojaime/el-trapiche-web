// src/components/gobierno/TramitesOnline.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Clock, Calendar, Filter, ChevronDown } from 'lucide-react';

const TramitesOnline = ({ busqueda = '' }) => {
    const [tramites, setTramites] = useState([]);
    const [tramitesFiltrados, setTramitesFiltrados] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
    const [tramiteAbierto, setTramiteAbierto] = useState(null);

    // Datos de ejemplo (en producción, reemplazar por fetch a tu API)
    useEffect(() => {
        const tramitesEjemplo = [
            {
                id: 1,
                titulo: 'Pago de Tasas Municipales',
                descripcion: 'Realice el pago online de tasas por servicios municipales, contribuciones y otros tributos.',
                categoria: 'Impuestos',
                tiempoEstimado: '5 minutos',
                requisitos: [
                    'Número de contribuyente o DNI',
                    'Dirección del inmueble',
                    'Tarjeta de crédito/débito o CBU para débito automático',
                ],
                pasos: [
                    'Ingresar número de contribuyente',
                    'Verificar deuda pendiente',
                    'Seleccionar método de pago',
                    'Confirmar transacción',
                ],
                url: 'https://pagos.eltrapiche.gob.ar',
                destacado: true,
            },
            {
                id: 2,
                titulo: 'Solicitud de Certificado de Residencia',
                descripcion: 'Gestione y descargue su certificado de residencia para trámites oficiales.',
                categoria: 'Certificados',
                tiempoEstimado: '24 horas',
                requisitos: [
                    'DNI o documento de identidad',
                    'Comprobante de domicilio',
                    'Declaración jurada de residencia',
                ],
                pasos: [
                    'Completar formulario de solicitud',
                    'Adjuntar documentación requerida',
                    'Enviar solicitud',
                    'Recibir certificado por email',
                ],
                url: 'https://tramites.eltrapiche.gob.ar/residencia',
                destacado: false,
            },
            {
                id: 3,
                titulo: 'Habilitación Comercial',
                descripcion: 'Inicie el trámite para habilitar su negocio o emprendimiento en el municipio.',
                categoria: 'Comercio',
                tiempoEstimado: '5 a 10 días hábiles',
                requisitos: [
                    'CUIT/CUIL del titular',
                    'Título de propiedad o contrato de alquiler',
                    'Plano del local',
                    'Certificado de seguridad contra incendios',
                    'Inscripción en AFIP',
                ],
                pasos: [
                    'Completar formulario de solicitud',
                    'Adjuntar documentación requerida',
                    'Abonar tasa de habilitación',
                    'Aguardar inspección municipal',
                    'Recibir certificado de habilitación',
                ],
                url: 'https://tramites.eltrapiche.gob.ar/habilitacion',
                destacado: true,
            },
            {
                id: 4,
                titulo: 'Reclamos y Denuncias',
                descripcion: 'Sistema de gestión de reclamos y denuncias para servicios municipales.',
                categoria: 'Servicios',
                tiempoEstimado: '48 horas',
                requisitos: [
                    'Datos personales del denunciante',
                    'Descripción detallada del reclamo',
                    'Ubicación del problema (opcional)',
                    'Fotos o documentación de respaldo (opcional)',
                ],
                pasos: [
                    'Ingresar tipo de reclamo',
                    'Completar formulario detallado',
                    'Adjuntar documentación de respaldo',
                    'Enviar reclamo',
                    'Recibir número de seguimiento',
                ],
                url: 'https://tramites.eltrapiche.gob.ar/reclamos',
                destacado: false,
            },
            {
                id: 5,
                titulo: 'Permiso de Construcción',
                descripcion: 'Solicite permisos para obras nuevas, ampliaciones o refacciones.',
                categoria: 'Obras',
                tiempoEstimado: '15 días hábiles',
                requisitos: [
                    'Título de propiedad',
                    'Planos firmados por profesional matriculado',
                    'Memoria descriptiva de la obra',
                    'Certificado catastral',
                    'Pago de tasa de construcción',
                ],
                pasos: [
                    'Registrarse en el sistema',
                    'Cargar documentación requerida',
                    'Abonar tasa correspondiente',
                    'Seguimiento del trámite',
                    'Recibir permiso aprobado',
                ],
                url: 'https://tramites.eltrapiche.gob.ar/obras',
                destacado: true,
            },
            {
                id: 6,
                titulo: 'Licencia de Conducir',
                descripcion: 'Gestione turnos para obtención, renovación o duplicado de licencia de conducir.',
                categoria: 'Transporte',
                tiempoEstimado: 'Variable según trámite',
                requisitos: [
                    'DNI original y copia',
                    'Certificado de antecedentes',
                    'Certificado de aptitud psicofísica',
                    'Certificado de libre deuda de multas',
                    'Comprobante de pago de tasas',
                ],
                pasos: [
                    'Solicitar turno online',
                    'Abonar tasas correspondientes',
                    'Asistir al turno con documentación',
                    'Realizar exámenes correspondientes',
                    'Recibir licencia',
                ],
                url: 'https://tramites.eltrapiche.gob.ar/licencia',
                destacado: false,
            },
        ];

        setTramites(tramitesEjemplo);
    }, []);

    // Recalcular lista filtrada al cambiar búsqueda o categoría
    useEffect(() => {
        let resultados = [...tramites];

        if (busqueda.trim()) {
            const termino = busqueda.toLowerCase();
            resultados = resultados.filter(
                (t) =>
                    t.titulo.toLowerCase().includes(termino) ||
                    t.descripcion.toLowerCase().includes(termino) ||
                    t.categoria.toLowerCase().includes(termino),
            );
        }

        if (categoriaSeleccionada !== 'todas') {
            resultados = resultados.filter((t) => t.categoria === categoriaSeleccionada);
        }

        setTramitesFiltrados(resultados);
    }, [busqueda, categoriaSeleccionada, tramites]);

    // Categorías únicas + 'todas'
    const categorias = useMemo(() => {
        const unicas = Array.from(new Set(tramites.map((t) => t.categoria))).sort();
        return ['todas', ...unicas];
    }, [tramites]);

    const toggleTramite = (id) => {
        setTramiteAbierto((prev) => (prev === id ? null : id));
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Trámites Online</h2>

            {/* Filtro por categoría */}
            <div className="flex">
                <div className="relative w-full max-w-xs">
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categorias.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat === 'todas' ? 'Todas las categorías' : cat}
                            </option>
                        ))}
                    </select>
                    <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Trámites destacados */}
            {busqueda === '' && categoriaSeleccionada === 'todas' && (
                <section>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Trámites destacados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tramites
                            .filter((t) => t.destacado)
                            .map((t) => (
                                <a
                                    key={t.id}
                                    href={t.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
                                >
                                    <h4 className="font-bold text-gray-800 mb-2">{t.titulo}</h4>
                                    <p className="text-gray-600 text-sm mb-3">{t.descripcion}</p>
                                    <div className="flex items-center gap-1 text-xs text-blue-600">
                                        <Clock size={14} />
                                        <span>{t.tiempoEstimado}</span>
                                    </div>
                                </a>
                            ))}
                    </div>
                </section>
            )}

            {/* Lista completa */}
            {tramitesFiltrados.length ? (
                <div className="space-y-4">
                    {tramitesFiltrados.map((t) => (
                        <div key={t.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <button
                                type="button"
                                onClick={() => toggleTramite(t.id)}
                                className="w-full p-5 flex justify-between items-start text-left"
                            >
                                <div>
                                    <h3 className="font-bold text-gray-800">{t.titulo}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{t.descripcion}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {t.categoria}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock size={14} />
                                            {t.tiempoEstimado}
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`text-gray-400 transition-transform ${tramiteAbierto === t.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {tramiteAbierto === t.id && (
                                <div className="p-5 pt-0 border-t border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-2">Requisitos</h4>
                                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                                {t.requisitos.map((r, i) => (
                                                    <li key={i}>{r}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-2">Pasos a seguir</h4>
                                            <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600">
                                                {t.pasos.map((p, i) => (
                                                    <li key={i}>{p}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                        <a
                                            //href={t.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                        >
                                            Próximamente                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron trámites</h3>
                    <p className="text-gray-600 mb-4">
                        No hay trámites que coincidan con tu búsqueda o filtros seleccionados.
                    </p>
                    <button
                        onClick={() => setCategoriaSeleccionada('todas')}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Ver todos los trámites
                    </button>
                </div>
            )}
        </div>
    );
};

export default TramitesOnline;
