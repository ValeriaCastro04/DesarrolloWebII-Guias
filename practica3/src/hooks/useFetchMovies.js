import { useEffect, useState } from "react"; 

export const API_KEY = "COLOCA TU API KEY ACA";
/* Hook personalizado para obtener peliculas desde la API de OMDd*/
    @param {string} query
    @returns {Object}

export function useFetchMovies(query){
    const [movies, setMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    
}