// Componente para mostrar grid de autoridades municipales
// src/components/gobierno/AutoridadesGrid.jsx

import React, { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';

const AutoridadesGrid = ({ busqueda = '' }) => {
    const [autoridades, setAutoridades] = useState([]);
    const [filtradas, setFiltradas] = useState([]);

    // Datos de ejemplo para autoridades
    useEffect(() => {
        // En producción, obtener desde API
        const autoridadesEjemplo = [
            {
                id: 1,
                nombre: 'Ricardo Olivera Aguirre',
                cargo: 'Intendente Municipal',
                partido: 'Avanzar',
                foto: '/assets/images/autoridades/intendente.jpg',
                email: 'intendente@eltrapiche.gob.ar',
                telefono: '(02652) 493 025 Int. 101',
                bio: 'Intendente de El Trapiche desde 2021. Licenciado en Administración Pública con experiencia en gestión municipal.'
            },
            {
                id: 2,
                nombre: 'Carolina Calderón',
                cargo: 'Presidente del Concejo Deliberante',
                partido: 'Avanzar',
                foto: '/assets/images/autoridades/presidente-concejo.jpg',
                email: 'concejo@eltrapiche.gob.ar',
                telefono: '(02652) 493 025 Int. 201',
                bio: 'Presidente del Concejo Deliberante desde 2023. Abogada especializada en derecho administrativo.'
            },
            {
                id: 3,
                nombre: 'Damián Cirilo',
                cargo: 'Concejal',
                partido: 'Juntos',
                foto: '/assets/images/autoridades/concejal-1.jpg',
                email: 'dcirilo@eltrapiche.gob.ar',
                telefono: '(02652) 493 025 Int. 202',
                bio: 'Concejal desde 2021. Emprendedor con foco en desarrollo turístico y sustentable.'
            },
            {
                id: 4,
                nombre: 'Estela Ojeda',
                cargo: 'Concejal',
                partido: 'PJ',
                foto: '/assets/images/autoridades/concejal-2.jpg',
                email: 'eojeda@eltrapiche.gob.ar',
                telefono: '(02652) 493 025 Int. 203',
                bio: 'Concejal desde 2019. Docente con amplia trayectoria en el ámbito educativo local.'
            },
            {
                id: 5,
                nombre: 'Martín Gómez',
                cargo: 'Secretario de Obras Públicas',
                partido: 'Avanzar',
                foto: '/assets/images/autoridades/secretario-obras.jpg',
                email: 'obraspublicas@eltrapiche.gob.ar',
                telefono: '(02652) 493 025 Int. 301',
                bio: 'Ingeniero civil con 15 años de experiencia en infraestructura pública.'
            },
            {
                id: 6,
                nombre: 'Lucía Fernández',
                cargo: 'Secretaria de Turismo',
                partido: 'Avanzar',
                foto: '/assets/images/autoridades/secretaria-turismo.jpg',
                email: 'turismo@eltrapiche.gob.ar',
                telefono: '(02652) 493 025 Int. 401',
                bio: 'Licenciada en Turismo. Gestiona las iniciativas turísticas desde 2021.'
            }
        ];

        setAutoridades(autoridadesEjemplo);
        setFiltradas(autoridadesEjemplo);
    }, []);

    // Filtrar autoridades según búsqueda
    useEffect(() => {
        if (!busqueda.trim()) {
            setFiltradas(autoridades);
            return;
        }

        const termino = busqueda.toLowerCase();
        const resultados = autoridades.filter(
            autoridad =>
                autoridad.nombre.toLowerCase().includes(termino) ||
                autoridad.cargo.toLowerCase().includes(termino) ||
                autoridad.partido.toLowerCase().includes(termino) ||
                (autoridad.bio && autoridad.bio.toLowerCase().includes(termino))
        );

        setFiltradas(resultados);
    }, [busqueda, autoridades]);

    // Renderizar mensaje si no hay resultados
    if (filtradas.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No se encontraron autoridades que coincidan con "{busqueda}"</p>
                <button
                    onClick={() => setFiltradas(autoridades)}
                    className="mt-4 text-blue-600 hover:text-blue-800"
                >
                    Mostrar todas las autoridades
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Autoridades Municipales</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtradas.map((autoridad) => (
                    <div
                        key={autoridad.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="relative h-64">
                            <img
                                src={autoridad.foto || '/assets/images/autoridades/default.jpg'}
                                alt={`${autoridad.nombre} - ${autoridad.cargo}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                                    {autoridad.partido}
                                </div>
                                <h3 className="text-white text-xl font-bold">{autoridad.nombre}</h3>
                                <p className="text-white/90">{autoridad.cargo}</p>
                            </div>
                        </div>

                        <div className="p-4">
                            <p className="text-gray-600 text-sm mb-4">{autoridad.bio}</p>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail size={16} className="text-blue-500" />
                                    <a href={`mailto:${autoridad.email}`} className="hover:text-blue-600">
                                        {autoridad.email}
                                    </a>
                                </div>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone size={16} className="text-blue-500" />
                                    <span>{autoridad.telefono}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AutoridadesGrid;