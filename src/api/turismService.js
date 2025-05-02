// Servicio para gestionar atracciones turísticas
// src/api/turismService.js

/**
 * Obtiene las atracciones turísticas principales
 * @param {number} limite - Número de atracciones a obtener
 * @returns {Promise<Array>} Lista de atracciones turísticas
 */
export const obtenerAtraccionesPrincipales = async (limite = 4) => {
    try {
        // En producción, hacer un fetch a la API real
        // En desarrollo, usamos datos de ejemplo

        const atraccionesEjemplo = [
            {
                id: 1,
                nombre: 'Embalse La Florida',
                imagen: '/assets/images/turismo/embalse-florida.jpg',
                descripcionCorta: 'Lago de 6 km ideal para deportes náuticos, pesca y recreación.',
                categoria: 'embalses',
                destacado: true
            },
            {
                id: 2,
                nombre: 'Río Trapiche y Costanera',
                imagen: '/assets/images/turismo/rio-trapiche.jpg',
                descripcionCorta: 'Balneario natural con senderos y puentes panorámicos.',
                categoria: 'balnearios',
                destacado: true
            },
            {
                id: 3,
                nombre: 'Dique Esteban Agüero',
                imagen: '/assets/images/turismo/dique-aguero.jpg',
                descripcionCorta: 'A 5 km al norte, ofrece pesca y un perilago escénico.',
                categoria: 'embalses',
                destacado: false
            },
            {
                id: 4,
                nombre: 'Reserva Florofaunística',
                imagen: '/assets/images/turismo/reserva-flora.jpg',
                descripcionCorta: 'Área protegida para avistaje de flora y fauna serrana.',
                categoria: 'avistaje',
                destacado: false
            },
            {
                id: 5,
                nombre: 'Circuito Sierras-Diques',
                imagen: '/assets/images/turismo/circuito-sierras.jpg',
                descripcionCorta: 'Rutas escénicas que unen El Volcán, Pancanta y La Carolina.',
                categoria: 'miradores',
                destacado: false
            }
        ];

        // Ordenar: primero los destacados, luego el resto
        const atraccionesOrdenadas = atraccionesEjemplo.sort((a, b) => {
            if (a.destacado && !b.destacado) return -1;
            if (!a.destacado && b.destacado) return 1;
            return 0;
        });

        // Devolver solo la cantidad solicitada
        return atraccionesOrdenadas.slice(0, limite);
    } catch (error) {
        console.error('Error obteniendo atracciones turísticas:', error);
        throw error;
    }
};

/**
 * Obtiene una atracción turística específica por su ID
 * @param {number} id - ID de la atracción
 * @returns {Promise<Object>} Detalle de la atracción
 */
export const obtenerAtraccionPorId = async (id) => {
    try {
        // En producción, hacer un fetch a la API real
        // En desarrollo, simulamos la búsqueda en datos de ejemplo

        const atraccionesEjemplo = [
            {
                id: 1,
                nombre: 'Embalse La Florida',
                imagen: '/assets/images/turismo/embalse-florida.jpg',
                descripcionCorta: 'Lago de 6 km ideal para deportes náuticos, pesca y recreación.',
                descripcionCompleta: 'El Embalse La Florida, ubicado a pocos kilómetros de El Trapiche, es un enorme lago artificial de 6 km de longitud que constituye uno de los principales atractivos turísticos de la región. Sus aguas cristalinas son ideales para la práctica de deportes náuticos como windsurf, kayak, jet ski y navegación a vela. La pesca deportiva es otra actividad destacada, con ejemplares de pejerrey, carpa y trucha. El perilago cuenta con varios miradores panorámicos, áreas de camping y servicios gastronómicos. La Estación de Piscicultura La Florida, ubicada en sus cercanías, es un centro de reproducción de especies acuáticas que puede ser visitado con reserva previa.',
                categoria: 'embalses',
                destacado: true,
                coordenadas: {
                    lat: -33.120925,
                    lng: -66.03738056
                },
                actividades: [
                    'Pesca deportiva',
                    'Deportes náuticos',
                    'Camping',
                    'Senderismo',
                    'Avistaje de aves'
                ],
                horarios: 'Acceso libre las 24 horas',
                ubicacion: 'A 5 km al sur de El Trapiche por RP 9',
                galeria: [
                    '/assets/images/turismo/embalse-florida-1.jpg',
                    '/assets/images/turismo/embalse-florida-2.jpg',
                    '/assets/images/turismo/embalse-florida-3.jpg'
                ]
            },
            // Otras atracciones...
        ];

        // Buscar la atracción por ID
        const atraccionEncontrada = atraccionesEjemplo.find(atraccion => atraccion.id === parseInt(id));

        if (!atraccionEncontrada) {
            throw new Error('Atracción turística no encontrada');
        }

        return atraccionEncontrada;
    } catch (error) {
        console.error('Error obteniendo atracción turística:', error);
        throw error;
    }
};

/**
 * Obtiene puntos de interés para el mapa interactivo
 * @returns {Promise<Array>} Lista de puntos de interés con coordenadas
 */
export const obtenerPuntosDeInteres = async () => {
    try {
        // En producción, hacer un fetch a la API real
        // En desarrollo, usamos datos de ejemplo con coordenadas

        return [
            {
                id: 1,
                nombre: 'Embalse La Florida',
                descripcion: 'Lago para deportes náuticos y pesca',
                categoria: 'embalses',
                coordenadas: [-33.120925, -66.03738056]
            },
            {
                id: 2,
                nombre: 'Río Trapiche',
                descripcion: 'Balneario natural y recreación',
                categoria: 'balnearios',
                coordenadas: [-33.102925, -66.05738056]
            },
            {
                id: 3,
                nombre: 'Dique Esteban Agüero',
                descripcion: 'Pesca y perilago escénico',
                categoria: 'embalses',
                coordenadas: [-33.085925, -66.06738056]
            },
            {
                id: 4,
                nombre: 'Mirador Cerro de Oro',
                descripcion: 'Vista panorámica de todo el valle',
                categoria: 'miradores',
                coordenadas: [-33.112925, -66.04738056]
            },
            {
                id: 5,
                nombre: 'Reserva Florofaunística',
                descripcion: 'Avistaje de fauna y flora serrana',
                categoria: 'avistaje',
                coordenadas: [-33.095925, -66.05238056]
            },
            {
                id: 6,
                nombre: 'Camping Municipal',
                descripcion: 'Área de acampe con servicios',
                categoria: 'camping',
                coordenadas: [-33.102925, -66.05938056]
            }
        ];
    } catch (error) {
        console.error('Error obteniendo puntos de interés:', error);
        throw error;
    }
};