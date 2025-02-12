import { useState } from "react";

const containerStyle ={
    display: "flex",
    alignItems:"center",
    gap:"16px"
};

const starContainerStyle = {
    display: "flex",
    gap: "4px"
};

/**
 * componente que muestra un sistema de calificacion con estrellas interactiva
 * @param {Object} props
 * @param {number} props.maxRating - num maximo de estrellas (por defecto 5)
 * @param {string} props.color - color de las estrellas (por defecto '#fcc419')
 * @param {number} props.size - tamano de las estrellas en pixeles (por defecto 30px)
 * @param {number} props.defaultRating - calificacion inicial seleccionada por defecto 0
 * @param {Function} props.onSetRating - funcion que se ejecuta al seleccionar una calificacion
 */

export default function StarRating({
    maxRating = 5,
    color = '#fcc419',
    size = 30,
    defaultRating = 0,
    onSetRating
}) {
    const textStyle = {
        lineHeight: "1",
        margin:"0",
        color,
        fontSize: `${size}px`

    };

    const [rating, setRating] = useState(defaultRating);

    const [tempRating, setTempRating] = useState(0);

    /**
     * maneja el evento de seleccion de una calificacion
     * @param {number} rating - calificacion seleccionada
     */

    function handleRating(rating){
        setRating(rating);
        onSetRating?.(rating);
    }

    return (
        <div style={containerStyle}>
            {/*Contenedor de estrellas */}
            <div style={starContainerStyle}>
                {Array.from({lenght: maxRating}, (_,i)=>(
                    <Star
                        key={i}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onRate={() => handleRating(i+1)}
                        onHoverIn = {() => setTempRating(i + 1)}
                        onHoverOut = {() => setTempRating(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            {/*muestra la calificacion seleccionada o temporal */}
            <p style={textStyle}>{tempRating || rating || ""}</p>
        </div>
    );
}

/**
 * componente que representa una estrella individual en el sistema de calificacion
 * @param {Object} props
 * @param {boolean} props.full - indica si la estrella esta rellena o vacia
 * @param {Function} props.onRate - funcion que se ejecuta al hacer click en la estrella
 * @param {Function} props.onHoverIn - funcion que se ejecuta al pasar el mouse sobre la estrella
 * @param {Function} props.onHoverOut - funcion que se ejecuta al quitar el mouse de la estrella
 * @param {string} props.color - color de la estrella
 * @param {number} props.size - tamano de la estrella en pixeles
 */

function Star({full, onRate, onHoverIn, onHoverOut, color, size}) {
    //ESTILOS DE LA ESTRELLA
    const starStyle = {
        width: `${size}px`,         
        height: `${size}px`,         
        display: "block",         
        cursor: "pointer" 
    };

    return (
        <span
        role="button"              
        style={starStyle}              
        onClick={onRate}              
        onMouseEnter={onHoverIn}              
        onMouseLeave={onHoverOut} 
        >

            {full ? (
                 <svg                     
                    xmlns="http://www.w3.org/2000/svg"                     
                    viewBox="0 0 20 20"                     
                    fill={color}                     
                    stroke={color}                 
                 >                     
                    <path                         
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 
                    1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.571.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381.81.588-1.81h3.461a1 
                    1 0 00.951-.69l1.07-3.292z"                     
                    />                
                     </svg>
            ) : (
                 // Estrella vacía                 
                 <svg                     
                    xmlns="http://www.w3.org/2000/svg"                     
                    fill="none"                     
                    viewBox="0 0 24 24"                     
                    stroke={color}                 
                    >                     
                    <path                         
                        strokeLinecap="round"                         
                        strokeLinejoin="round"
                        strokeWidth="2"                         
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 
                        1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57.38-1.81.588-1.81h4.914a1 
                        1 0 00.951-.69l1.519-4.674z"                     
                        />                 
                        </svg> 
            )}
        </span>
    );
}
