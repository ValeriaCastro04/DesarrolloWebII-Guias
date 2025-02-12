import { useState } from "react"; 
import { Logo, Nav, NumResults, Search } from "./components/Nav"; 
import { Box } from "./components/Box"; import { MovieList } from "./components/Movie"; 
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie"; 
import { useFetchMovies } from "./hooks/useFetchMovies"; 
import { MovieDetails } from "./components/MovieDetails"; 

/**
 *  Componente principal de la aplicación.
 */

export default function App() {

    const [query, setQuery] = useState("");

    const {movies, isLoading, error} = useFetchMovies(query)

    const [watched, setWatched] = useState([]);


    const [selectedId, setSelectedId] = useState(null);

    /**
     * Maneja la selección de una película.
     *  @param {string} id - ID de la película seleccionada.
     */

    function handleSelectMovie(id){
        setSelectedId(id);
    }


    /**
     *  Cierra los detalles de la película.
     */
    function handleCloseMovie() {     
        setSelectedId(null);   
    } 

    /**
     * Agrega una película a la lista de vistas.
     *  @param {Object} movie - Película a agregar.
     */

    function handleAddWatched(movie) {     
        setWatched((watched) => [...watched, movie]);   
    } 

    return(
        <>
        <Nav>
            <Logo/>

            <Search query={query} setQuery={setQuery}/>
            <NumResults movies={movies}/>
        </Nav>
        <main className="main">
            <Box>
                {isLoading && <p className="loader">Cargando...</p>}
                {error && <p className="error">⛔</p>}
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            </Box>

            <Box>
                <WatchedMoviesContainer>
                    {selectedId ?(
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />

                    ):(
                        <>
                            <WatchedSummary watched={watched}/>
                            <WatchedMoviesList watched={watched}/>      
                        </>
                    )}
                </WatchedMoviesContainer>
            </Box>
        </main>
        </>
    );
}