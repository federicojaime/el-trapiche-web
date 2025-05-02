// Servicio para obtener datos del clima de la API oficial de El Trapiche
// src/api/climaService.js

/**
 * Obtiene los datos del clima actual desde la API
 * @returns {Promise<Object>} Datos del clima actual
 */
export const obtenerClimaActual = async () => {
    try {
      // En producción, llamar directamente al endpoint
      // const response = await fetch(`${API_BASE_URL}?function=minutos&EstacionId=${ESTACION_ID}`);
      
      // Para desarrollo, usamos datos de ejemplo
      // En producción, usar el endpoint real mediante backend proxy para evitar CORS
      const mockResponse = {
        "Datos": [{
          "id_estacion": "16",
          "nombre": "El Trapiche",
          "fecha": "01/05/2025 11:30:00 p.m.",
          "latitud": "-33,102925",
          "longitud": "-66,05738056",
          "CrepusculoMatutino": "07:56:51 a.m.",
          "CrepusculoVespertino": "06:45:42 p.m.",
          "altura": "1073",
          "pp": "0,00000",
          "temp": "9,40000",
          "hh": "91,20000",
          "pp1h": "0,00000"
        }]
      };
      
      return mockResponse.Datos[0];
    } catch (error) {
      console.error('Error obteniendo datos del clima:', error);
      throw error;
    }
  };
  
  /**
   * Obtiene el pronóstico del clima para los próximos días
   * @param {number} dias - Número de días a pronosticar
   * @returns {Promise<Array>} Array con pronóstico diario
   */
  export const obtenerPronostico = async (dias = 3) => {
    try {
      // En producción, llamar al endpoint de pronósticos
      // const response = await fetch(`${API_BASE_URL}?function=pronosticos&EstacionId=${ESTACION_ID}`);
      
      // Para desarrollo, usamos datos de ejemplo
      const pronostico = [
        {
          fecha: '02/05/2025',
          tempMin: '7,20000',
          tempMax: '15,30000',
          estado: 'Soleado',
          probLluvia: '10',
          icono: 'sun'
        },
        {
          fecha: '03/05/2025',
          tempMin: '5,80000',
          tempMax: '14,70000',
          estado: 'Parcialmente nublado',
          probLluvia: '20',
          icono: 'cloud-sun'
        },
        {
          fecha: '04/05/2025',
          tempMin: '6,10000',
          tempMax: '13,90000',
          estado: 'Nublado',
          probLluvia: '60',
          icono: 'cloud'
        }
      ];
      
      return pronostico.slice(0, dias);
    } catch (error) {
      console.error('Error obteniendo pronóstico:', error);
      throw error;
    }
  };
  
  /**
   * Obtiene datos históricos del clima para una fecha específica
   * @param {string} fecha - Fecha en formato DD/MM/YYYY
   * @returns {Promise<Object>} Datos históricos del clima
   */
  export const obtenerDatosHistoricos = async (fecha) => {
    try {
      // En producción, llamar al endpoint
      // const response = await fetch(`${API_BASE_URL}?function=datosHistoricos&EstacionId=${ESTACION_ID}&Fecha=${fecha}`);
      
      // Para desarrollo, devolvemos datos de ejemplo
      return {
        fecha,
        tempMax: '16,80000',
        tempMin: '4,20000',
        lluviaTotal: '0,00000',
        humMedia: '75,30000',
        horasSol: '9,50000'
      };
    } catch (error) {
      console.error('Error obteniendo datos históricos:', error);
      throw error;
    }
  };
  
  /**
   * Formatea valores numéricos de la API para mostrar
   * @param {string} valor - Valor numérico con coma
   * @param {number} decimales - Número de decimales a mostrar
   * @returns {string} Valor formateado
   */
  export const formatearValor = (valor, decimales = 1) => {
    if (!valor) return '--';
    
    try {
      // Convertir de string con coma a número
      const numero = parseFloat(valor.replace(',', '.'));
      return numero.toFixed(decimales);
    } catch (error) {
      console.error('Error formateando valor:', error);
      return valor;
    }
  };