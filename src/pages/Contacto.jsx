// Página de Contacto
// src/pages/Contacto.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

// Componentes
import Hero from '../components/common/Hero';

const Contacto = () => {
    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });

    // Estado de envío
    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(null);

    // Manejar cambios en inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.nombre || !formData.email || !formData.mensaje) {
            setError('Por favor complete los campos obligatorios (*)');
            return;
        }

        setEnviando(true);
        setError(null);

        try {
            // Simular envío (en producción, conectar con API)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simular éxito
            setEnviado(true);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                asunto: '',
                mensaje: ''
            });
        } catch (err) {
            console.error('Error enviando formulario:', err);
            setError('Ocurrió un error al enviar el mensaje. Por favor intente nuevamente.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero con imagen de fondo */}
            <Hero
                imageSrc="assets/images/intendente2.jpg"
                title="Contacto"
                subtitle="Estamos para atenderte y escuchar tus consultas"
                height="small"
            />

            {/* Contenido principal */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Información de contacto */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de contacto</h2>

                            <ul className="space-y-6">
                                <li className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <MapPin size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Dirección</h3>
                                        <p className="text-gray-600">Ruta Provincial 9, El Trapiche, San Luis, Argentina</p>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Phone size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Teléfono</h3>
                                        <p className="text-gray-600">(02652) 493 025</p>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Mail size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                        <p className="text-gray-600">contacto@eltrapiche.gob.ar</p>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Clock size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Horario de atención</h3>
                                        <p className="text-gray-600">Lunes a Viernes: 8:00 a 14:00</p>
                                    </div>
                                </li>
                            </ul>

                            {/* Botón de WhatsApp */}
                            <div className="mt-8">
                                <a
                                    href="https://wa.me/5492652493025"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Contactar por WhatsApp
                                </a>
                            </div>

                            {/* Mapa */}
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicación</h3>
                                <div className="rounded-lg overflow-hidden h-64">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13348.676903097285!2d-66.05738056!3d-33.102925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4394e16867ae9%3A0xbc8d79e1d59d5e5!2sEl%20Trapiche%2C%20San%20Luis!5e0!3m2!1ses!2sar!4v1625120000000!5m2!1ses!2sar"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Mapa de ubicación"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h2>

                            {/* Mensaje de éxito */}
                            {enviado && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 bg-green-50 border-l-4 border-green-500 p-4"
                                >
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Check className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-green-700">
                                                Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo a la brevedad.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Mensaje de error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 bg-red-50 border-l-4 border-red-500 p-4"
                                >
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                            Nombre completo *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                                            Teléfono
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="tel"
                                                name="telefono"
                                                id="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="asunto" className="block text-sm font-medium text-gray-700">
                                            Asunto
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="asunto"
                                                id="asunto"
                                                value={formData.asunto}
                                                onChange={handleChange}
                                                className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                                            Mensaje *
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                name="mensaje"
                                                id="mensaje"
                                                rows="6"
                                                value={formData.mensaje}
                                                onChange={handleChange}
                                                className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={enviando || enviado}
                                        className={`w-full inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${enviando
                                                ? 'bg-blue-400 cursor-not-allowed'
                                                : enviado
                                                    ? 'bg-green-600 cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                            }`}
                                    >
                                        {enviando ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : enviado ? (
                                            <>
                                                <Check className="mr-2 h-5 w-5" />
                                                Mensaje enviado
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                Enviar mensaje
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 mt-4">
                                    Los campos marcados con * son obligatorios. Tu información será tratada con confidencialidad.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de áreas específicas */}
            <section className="bg-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Contactos específicos</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Turismo</h3>
                            <p className="text-gray-600 mb-4">Información sobre atractivos, actividades y alojamiento.</p>
                            <div className="space-y-2">
                                <p className="flex items-center gap-2 text-gray-700">
                                    <Mail size={16} className="text-blue-500" />
                                    turismo@eltrapiche.gob.ar
                                </p>
                                <p className="flex items-center gap-2 text-gray-700">
                                    <Phone size={16} className="text-blue-500" />
                                    (02652) 493 025 Int. 401
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Obras Públicas</h3>
                            <p className="text-gray-600 mb-4">Consultas sobre infraestructura y servicios urbanos.</p>
                            <div className="space-y-2">
                                <p className="flex items-center gap-2 text-gray-700">
                                    <Mail size={16} className="text-blue-500" />
                                    obraspublicas@eltrapiche.gob.ar
                                </p>
                                <p className="flex items-center gap-2 text-gray-700">
                                    <Phone size={16} className="text-blue-500" />
                                    (02652) 493 025 Int. 301
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Defensa Civil</h3>
                            <p className="text-gray-600 mb-4">Emergencias, prevención y asistencia.</p>
                            <div className="space-y-2">
                                <p className="flex items-center gap-2 text-gray-700">
                                    <Mail size={16} className="text-blue-500" />
                                    defensacivil@eltrapiche.gob.ar
                                </p>
                                <p className="flex items-center gap-2 text-gray-700">
                                    <Phone size={16} className="text-blue-500" />
                                    (02652) 493 099
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contacto;