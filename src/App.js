import React, {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const apiKey = 'c032e2d7'
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&`;

const App = () => {
    const [movie, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${apiUrl}&s=${title}`);
        const json = await response.json();
        setMovies(json.Search);
        console.log(json.Search)
    }

    useEffect(() => {
        searchMovies('Superman')
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value)}} />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => {searchMovies(searchTerm)}} />
            </div>

            {
                movie?.length > 0 ?(
                <div className='container'>
                    {movie.map(movie => 
                        <MovieCard key={movie.imdbID} movie={movie} />)}
                    
                </div>) :(
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>)

            }
            
        </div>
    );
}

export default App;