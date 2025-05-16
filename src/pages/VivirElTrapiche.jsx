// Página de "Vivir El Trapiche"
// src/pages/VivirElTrapiche.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Cloud, School, Building, HeartPulse, Flower } from 'lucide-react';

// Componentes
import Hero from '../components/common/Hero';
import ClimaDetallado from '../components/clima/ClimaDetallado';

// API
import { obtenerClimaActual, obtenerPronostico } from '../api/climaService';

const VivirElTrapiche = () => {
    const [climaActual, setClimaActual] = useState(null);
    const [pronostico, setPronostico] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [climaData, pronosticoData] = await Promise.all([
                    obtenerClimaActual(),
                    obtenerPronostico(3)
                ]);

                setClimaActual(climaData);
                setPronostico(pronosticoData);
            } catch (error) {
                console.error("Error cargando datos del clima:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero con imagen de fondo */}
            <Hero
                imageSrc="assets/images/clima.jpg"
                title="Vivir en El Trapiche"
                subtitle="Descubrí los servicios y la calidad de vida de nuestra localidad"
                height="medium"
            />

            {/* Contenido principal */}
            <section className="container mx-auto px-4 py-12">
                <Tabs defaultValue="clima" className="w-full">
                    <TabsList className="bg-white rounded-lg shadow-md p-2 mb-8 flex flex-wrap">
                        <TabsTrigger value="clima" className="flex items-center gap-2">
                            <Cloud size={18} />
                            <span>Clima</span>
                        </TabsTrigger>
                        <TabsTrigger value="educacion" className="flex items-center gap-2">
                            <School size={18} />
                            <span>Educación</span>
                        </TabsTrigger>
                        <TabsTrigger value="salud" className="flex items-center gap-2">
                            <HeartPulse size={18} />
                            <span>Salud</span>
                        </TabsTrigger>
                        <TabsTrigger value="servicios" className="flex items-center gap-2">
                            <Building size={18} />
                            <span>Servicios</span>
                        </TabsTrigger>
                        <TabsTrigger value="ambiente" className="flex items-center gap-2">
                            <Flower size={18} />
                            <span>Ambiente</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Contenido de la pestaña Clima */}
                    <TabsContent value="clima" id="clima">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Clima en El Trapiche</h2>

                            {cargando ? (
                                <div className="animate-pulse">
                                    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                                    <div className="h-40 bg-gray-200 rounded-lg"></div>
                                </div>
                            ) : (
                                <ClimaDetallado
                                    datosClima={climaActual}
                                    pronostico={pronostico}
                                />
                            )}

                            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4">
                                <h3 className="font-bold text-blue-800 mb-2">Clima Serrano</h3>
                                <p className="text-gray-700">
                                    El Trapiche goza de un clima templado serrano (Cwb) con precipitaciones concentradas en verano y
                                    temperaturas agradables. Los veranos son suaves y los inviernos fríos, con ocasionales nevadas en las
                                    zonas más altas. La primavera es la época ideal para visitar, con clima estable y floración en las sierras.
                                </p>
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* Contenido de la pestaña Educación */}
                    <TabsContent value="educacion">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Educación</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src="assets/images/escuela.jpg"
                                        alt="Centro Educativo N.º 5 Sen. Alfredo Bertín"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Centro Educativo N.º 5 "Sen. Alfredo Bertín"
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Educación inicial, primaria y secundaria. Institución pública con más de 50 años de trayectoria educativa.
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p><span className="font-medium">Dirección:</span> Av. Los Fresnos 450</p>
                                            <p><span className="font-medium">Teléfono:</span> (0266) 449-3085</p>
                                            <p><span className="font-medium">Horario:</span> Lunes a Viernes 8:00 a 17:30</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src="assets/images/escuelaadulta.jpg"
                                        alt="EPDA N.º 15"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            EPDA N.º 15
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Educación para adultos. Ofrece programas de educación primaria y secundaria para jóvenes y adultos.
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p><span className="font-medium">Dirección:</span> Calle Los Pinos 120</p>
                                            <p><span className="font-medium">Teléfono:</span> (0266) 449-3086</p>
                                            <p><span className="font-medium">Horario:</span> Lunes a Viernes 18:00 a 22:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-blue-800 mb-3">Talleres Municipales</h3>
                                <p className="text-gray-700 mb-4">
                                    La Municipalidad ofrece diversos talleres educativos y culturales para todas las edades:
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <li className="bg-white p-3 rounded-lg shadow-sm">
                                        <span className="font-medium block">Música</span>
                                        <span className="text-sm text-gray-600">Martes y Jueves 17:00 a 19:00</span>
                                    </li>
                                    <li className="bg-white p-3 rounded-lg shadow-sm">
                                        <span className="font-medium block">Danzas folclóricas</span>
                                        <span className="text-sm text-gray-600">Lunes y Miércoles 18:00 a 20:00</span>
                                    </li>
                                    <li className="bg-white p-3 rounded-lg shadow-sm">
                                        <span className="font-medium block">Artes plásticas</span>
                                        <span className="text-sm text-gray-600">Viernes 16:00 a 18:00</span>
                                    </li>
                                    <li className="bg-white p-3 rounded-lg shadow-sm">
                                        <span className="font-medium block">Computación</span>
                                        <span className="text-sm text-gray-600">Martes y Jueves 15:00 a 17:00</span>
                                    </li>
                                    <li className="bg-white p-3 rounded-lg shadow-sm">
                                        <span className="font-medium block">Oficios</span>
                                        <span className="text-sm text-gray-600">Sábados 10:00 a 12:00</span>
                                    </li>
                                    <li className="bg-white p-3 rounded-lg shadow-sm">
                                        <span className="font-medium block">Idiomas</span>
                                        <span className="text-sm text-gray-600">Lunes y Viernes 19:00 a 21:00</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* Contenido de la pestaña Salud */}
                    <TabsContent value="salud">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Salud</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src="assets/images/hospital.jpg"
                                        alt="Hospital Regional Dr. René Favaloro"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Hospital Regional "Dr. René Favaloro"
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Centro de salud principal con atención las 24 horas y diversas especialidades médicas.
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p><span className="font-medium">Dirección:</span> Av. Los Algarrobos 200</p>
                                            <p><span className="font-medium">Teléfono:</span> (0266) 449-3070</p>
                                            <p><span className="font-medium">Guardia:</span> 24 horas</p>
                                        </div>

                                        <div className="mt-4 pt-4 border-t">
                                            <h4 className="font-medium text-gray-800 mb-2">Especialidades</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Clínica médica</span>
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Pediatría</span>
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Ginecología</span>
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Traumatología</span>
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Odontología</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src="assets/images/caps.jpg"
                                        alt="CAPS El Trapiche"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            CAPS El Trapiche
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Centro de Atención Primaria de la Salud, orientado a prevención y atención básica.
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p><span className="font-medium">Dirección:</span> Calle Los Aromos 85</p>
                                            <p><span className="font-medium">Teléfono:</span> (0266) 449-3072</p>
                                            <p><span className="font-medium">Horario:</span> Lunes a Viernes 8:00 a 16:00</p>
                                        </div>

                                        <div className="mt-4 pt-4 border-t">
                                            <h4 className="font-medium text-gray-800 mb-2">Servicios</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Vacunación</span>
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Control niño sano</span>
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Control embarazo</span>
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Nutrición</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-green-800 mb-3">Programa de Salud Comunitaria</h3>
                                <p className="text-gray-700 mb-4">
                                    La municipalidad desarrolla diversas iniciativas para promover la salud y el bienestar:
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-green-600 text-sm font-bold">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-800">Campañas de prevención</h4>
                                            <p className="text-sm text-gray-600">Charlas y actividades sobre prevención de enfermedades y promoción de hábitos saludables.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-green-600 text-sm font-bold">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-800">Actividad física para todos</h4>
                                            <p className="text-sm text-gray-600">Clases gratuitas de gimnasia, yoga y caminatas organizadas para diferentes grupos etarios.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-green-600 text-sm font-bold">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-800">Atención domiciliaria</h4>
                                            <p className="text-sm text-gray-600">Servicio de visitas médicas a adultos mayores y personas con movilidad reducida.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* Contenido de la pestaña Servicios */}
                    <TabsContent value="servicios">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Servicios Municipales</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold text-indigo-800 mb-3">Servicios Básicos</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Agua potable</span>
                                                <p className="text-sm text-gray-600">Servicio municipal con cobertura en todo el casco urbano.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Energía eléctrica</span>
                                                <p className="text-sm text-gray-600">Servicio a cargo de la empresa provincial EDESAL.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Cloacas</span>
                                                <p className="text-sm text-gray-600">Red en expansión con cobertura en el centro y barrios principales.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Internet</span>
                                                <p className="text-sm text-gray-600">Fibra óptica a través de Autopista de la Información provincial.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold text-indigo-800 mb-3">Mantenimiento Urbano</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Recolección de residuos</span>
                                                <p className="text-sm text-gray-600">Lunes, miércoles y viernes. Recolección diferenciada los martes.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Alumbrado público</span>
                                                <p className="text-sm text-gray-600">Sistema LED en vías principales y progresiva implementación en barrios.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Mantenimiento de calles</span>
                                                <p className="text-sm text-gray-600">Programa de bacheo y riego en calles no pavimentadas.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Áreas verdes</span>
                                                <p className="text-sm text-gray-600">Mantenimiento de plazas, parques y espacios públicos.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold text-indigo-800 mb-3">Seguridad</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Comisaría 17</span>
                                                <p className="text-sm text-gray-600">Policía provincial con servicio las 24 horas. Tel: (0266) 449-3071</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Bomberos Voluntarios</span>
                                                <p className="text-sm text-gray-600">Destacamento local con personal y equipo para emergencias.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Defensa Civil</span>
                                                <p className="text-sm text-gray-600">Coordinación de emergencias y prevención de desastres.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-indigo-600 text-xs">✓</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Cámaras de vigilancia</span>
                                                <p className="text-sm text-gray-600">Sistema de monitoreo en puntos estratégicos de la localidad.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-indigo-50 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-indigo-800 mb-3">Trámites Municipales</h3>
                                <p className="text-gray-700 mb-4">
                                    La municipalidad ofrece diversos trámites presenciales y online:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-medium text-indigo-800 mb-2">Trámites Presenciales</h4>
                                        <ul className="space-y-1 text-sm text-gray-600">
                                            <li>Licencias comerciales</li>
                                            <li>Habilitaciones</li>
                                            <li>Catastro y obras privadas</li>
                                            <li>Registro civil</li>
                                            <li>Servicios sociales</li>
                                        </ul>
                                        <p className="text-xs text-gray-500 mt-2">Horario: Lunes a Viernes de 8:00 a 14:00</p>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-medium text-indigo-800 mb-2">Trámites Online</h4>
                                        <ul className="space-y-1 text-sm text-gray-600">
                                            <li>Pago de tasas municipales</li>
                                            <li>Reclamos y denuncias</li>
                                            <li>Solicitud de turnos</li>
                                            <li>Certificados digitales</li>
                                            <li>Consultas y seguimiento</li>
                                        </ul>
                                        <a href="/municipio-transparente/tramites" className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                                            Acceder a trámites online →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* Contenido de la pestaña Ambiente */}
                    <TabsContent value="ambiente">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ambiente y Sostenibilidad</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src="assets/images/reserva.jpg"
                                        alt="Reserva Florofaunística"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Reserva Florofaunística
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Área protegida para la conservación de la biodiversidad serrana. Cuenta con senderos interpretativos
                                            y áreas de avistaje de aves.
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p><span className="font-medium">Superficie:</span> 850 hectáreas</p>
                                            <p><span className="font-medium">Ubicación:</span> A 5 km al noroeste del centro urbano</p>
                                            <p><span className="font-medium">Visitas:</span> Miércoles a Domingo, 9:00 a 17:00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src="assets/images/reciclado.jpg"
                                        alt="Programa de Reciclaje Municipal"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Programa de Reciclaje Municipal
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Iniciativa para la separación y tratamiento de residuos, con puntos verdes distribuidos en la localidad.
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p><span className="font-medium">Puntos verdes:</span> 6 distribuidos en el área urbana</p>
                                            <p><span className="font-medium">Recolección diferenciada:</span> Martes (reciclables) y Jueves (orgánicos)</p>
                                            <p><span className="font-medium">Centro de procesamiento:</span> Parque Ecoindustrial El Trapiche</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-emerald-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-bold text-emerald-800 mb-3">Biodiversidad local</h3>
                                    <p className="text-gray-700 mb-4">
                                        El Trapiche cuenta con una rica biodiversidad característica de la ecorregión serrana puntana.
                                    </p>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-medium text-emerald-700">Flora nativa</h4>
                                            <p className="text-sm text-gray-600">Algarrobos, espinillos, talas, chañares y hierbas aromáticas como peperina y tomillo.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-emerald-700">Fauna característica</h4>
                                            <p className="text-sm text-gray-600">Zorros, comadrejas, liebres patagónicas, águilas moras y más de 80 especies de aves.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-emerald-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-bold text-emerald-800 mb-3">Energías renovables</h3>
                                    <p className="text-gray-700 mb-4">
                                        Iniciativas para la implementación de energías limpias en la localidad.
                                    </p>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-medium text-emerald-700">Paneles solares</h4>
                                            <p className="text-sm text-gray-600">Programa de equipamiento de edificios públicos con sistemas fotovoltaicos.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-emerald-700">Incentivos para viviendas</h4>
                                            <p className="text-sm text-gray-600">Descuentos en tasas municipales para domicilios que implementen energías renovables.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-emerald-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-bold text-emerald-800 mb-3">Cuidado del agua</h3>
                                    <p className="text-gray-700 mb-4">
                                        Programas para el cuidado de los recursos hídricos, vitales para la región.
                                    </p>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-medium text-emerald-700">Monitoreo de ríos</h4>
                                            <p className="text-sm text-gray-600">Control periódico de la calidad del agua del Río Trapiche y afluentes.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-emerald-700">Consumo responsable</h4>
                                            <p className="text-sm text-gray-600">Campañas de concientización sobre el uso eficiente del agua potable.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-r-lg">
                                <h3 className="font-bold text-green-800 mb-3">Programa "El Trapiche Sustentable"</h3>
                                <p className="text-gray-700 mb-4">
                                    Plan integral municipal con objetivos a 2030 para una localidad ambientalmente responsable:
                                </p>
                                <ol className="space-y-3">
                                    <li className="flex items-start">
                                        <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                            <span className="text-green-700 font-bold">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-800">Reducción de la huella de carbono</h4>
                                            <p className="text-sm text-gray-600">Meta de reducción del 30% para 2030 mediante transporte sostenible y eficiencia energética.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                            <span className="text-green-700 font-bold">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-800">Gestión integral de residuos</h4>
                                            <p className="text-sm text-gray-600">Objetivo de reciclaje del 70% de los residuos generados y economía circular local.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                            <span className="text-green-700 font-bold">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-800">Educación ambiental</h4>
                                            <p className="text-sm text-gray-600">Programas educativos en escuelas y comunidad para formar ciudadanos ambientalmente responsables.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                            <span className="text-green-700 font-bold">4</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-800">Turismo sustentable</h4>
                                            <p className="text-sm text-gray-600">Promoción de prácticas turísticas de bajo impacto y certificación de proveedores eco-amigables.</p>
                                        </div>
                                    </li>
                                </ol>
                                <div className="mt-4 text-right">
                                    <a href="/municipio-transparente/programa-sustentable" className="text-green-700 hover:text-green-900 font-medium text-sm">
                                        Ver programa completo →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    );
};

export default VivirElTrapiche;