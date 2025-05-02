// Servicio para gestionar eventos
// src/api/eventosService.js

/**
 * Obtiene los próximos eventos
 * @param {number} limite - Número de eventos a obtener
 * @returns {Promise<Array>} Lista de eventos
 */
export const obtenerProximosEventos = async (limite = 3) => {
    try {
      // En producción, hacer un fetch a la API real
      // En desarrollo, usamos datos de ejemplo
      
      const eventosEjemplo = [
        {
          id: 1,
          titulo: 'Fiesta Provincial de los Ríos',
          fecha: '2025-01-25T20:00:00',
          imagen: '/assets/images/eventos/fiesta-rios.jpg',
          descripcion: 'Evento principal de la temporada estival con música, deportes y la tradicional elección de la reina.',
          lugar: 'Costanera del Río Trapiche'
        },
        {
          id: 2,
          titulo: 'Festival del Pescador',
          fecha: '2025-02-15T10:00:00',
          imagen: '/assets/images/eventos/festival-pescador.jpg',
          descripcion: 'Concurso de pesca deportiva en el Embalse La Florida con premiación y festival gastronómico.',
          lugar: 'Embalse La Florida'
        },
        {
          id: 3,
          titulo: 'Semana del Estudiante',
          fecha: '2025-09-21T16:00:00',
          imagen: '/assets/images/eventos/semana-estudiante.jpg',
          descripcion: 'Gran encuentro juvenil a la vera del río con actividades deportivas, arte y música en vivo.',
          lugar: 'Balneario Municipal'
        },
        {
          id: 4,
          titulo: 'Feria de Productores Locales',
          fecha: '2025-05-15T09:00:00',
          imagen: '/assets/images/eventos/feria-productores.jpg',
          descripcion: 'Exposición y venta de productos artesanales, miel, dulces y artesanías de la región.',
          lugar: 'Plaza Central'
        }
      ];
      
      // Ordenar eventos por fecha (los más próximos primero)
      const eventosOrdenados = eventosEjemplo.sort((a, b) => {
        return new Date(a.fecha) - new Date(b.fecha);
      });
      
      // Devolver solo la cantidad solicitada
      return eventosOrdenados.slice(0, limite);
    } catch (error) {
      console.error('Error obteniendo eventos:', error);
      throw error;
    }
  };
  
  /**
   * Obtiene un evento específico por su ID
   * @param {number} id - ID del evento
   * @returns {Promise<Object>} Detalle del evento
   */
  export const obtenerEventoPorId = async (id) => {
    try {
      // En producción, hacer un fetch a la API real
      // En desarrollo, simulamos la búsqueda en datos de ejemplo
      
      const eventosEjemplo = [
        {
          id: 1,
          titulo: 'Fiesta Provincial de los Ríos',
          fecha: '2025-01-25T20:00:00',
          imagen: '/assets/images/eventos/fiesta-rios.jpg',
          descripcion: 'Evento principal de la temporada estival con música, deportes y la tradicional elección de la reina.',
          descripcionCompleta: 'La Fiesta Provincial de los Ríos es el evento más importante de El Trapiche, celebrando la riqueza hídrica de la región. Durante tres días, los asistentes disfrutan de espectáculos musicales con artistas nacionales, actividades deportivas acuáticas, exposiciones de artesanos locales y la tradicional elección de la Reina de los Ríos. La gastronomía local tiene un lugar destacado con un patio de comidas que ofrece especialidades regionales. El cierre del festival cuenta con un espectáculo de fuegos artificiales sobre el río.',
          lugar: 'Costanera del Río Trapiche',
          coordenadas: {
            lat: -33.102925,
            lng: -66.05738056
          },
          galeria: [
            '/assets/images/eventos/fiesta-rios-1.jpg',
            '/assets/images/eventos/fiesta-rios-2.jpg',
            '/assets/images/eventos/fiesta-rios-3.jpg'
          ],
          horarios: [
            { dia: 'Viernes', hora: '18:00 a 02:00' },
            { dia: 'Sábado', hora: '16:00 a 03:00' },
            { dia: 'Domingo', hora: '12:00 a 00:00' }
          ]
        },
        // Otros eventos...
      ];
      
      // Buscar el evento por ID
      const eventoEncontrado = eventosEjemplo.find(evento => evento.id === parseInt(id));
      
      if (!eventoEncontrado) {
        throw new Error('Evento no encontrado');
      }
      
      return eventoEncontrado;
    } catch (error) {
      console.error('Error obteniendo evento:', error);
      throw error;
    }
  };
  
  /**
   * Obtiene eventos por categoría
   * @param {string} categoria - Categoría de eventos
   * @returns {Promise<Array>} Lista de eventos de la categoría
   */
  export const obtenerEventosPorCategoria = async (categoria) => {
    try {
      // Lógica para obtener eventos por categoría
      // ...
      
      return []; // Placeholder
    } catch (error) {
      console.error('Error obteniendo eventos por categoría:', error);
      throw error;
    }
  };