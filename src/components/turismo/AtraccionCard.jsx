// Componente para mostrar una tarjeta de atracción turística
// src/components/turismo/AtraccionCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AtraccionCard = ({
    nombre,
    imagen,
    descripcionCorta,
    url,
    destacado = false
}) => {
    return (
        <Link to={url} className="block h-full">
            <motion.div
                whileHover={{ y: -5 }}
                className={`relative h-full overflow-hidden rounded-lg ${destacado ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
            >
                {/* Imagen de fondo */}
                <img
                    src={imagen || "/assets/images/atraccion-default.jpg"}
                    alt={nombre}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    style={{ minHeight: '240px' }}
                />

                {/* Gradiente para mejorar visibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                    <h3 className={`font-bold mb-2 ${destacado ? 'text-2xl' : 'text-xl'}`}>
                        {nombre}
                    </h3>

                    {destacado && descripcionCorta && (
                        <p className="text-white/90 mb-2 line-clamp-2">
                            {descripcionCorta}
                        </p>
                    )}

                    <span className="inline-block text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        Ver más
                    </span>
                </div>
            </motion.div>
        </Link>
    );
};

export default AtraccionCard;