import { useEffect, useState } from 'react';
import '../css/MovieModal.css';
import { omdbMovieSearch } from './omdbApiSearch';
import { Movie } from '../types/movie';


function MovieModal(name: any) {

const [movie, setMovie] = useState<Movie>()
  useEffect(() => {
    omdbMovieSearch(name)
    .then(data => {
      setMovie(data)
  })
  .catch(err => console.log(err))

  }, [name]);

  return (
    <div className='container'>
      {movie ?
      <div className='container-content'>
       <img className='modal-image' src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
       <p className="movie-info">Title: {movie.Title}</p>
       <p className="movie-info">Year Released: {movie.Released}</p>
       <p className="movie-info">Director: {movie.Director}</p>
       <p className="movie-info">Actors: {movie.Actors}</p>
       <p className="movie-info">Genre: {movie.Genre}</p>
       <p className="movie-info">Plot: {movie.Plot}</p>
       </div>
       :
       null}   
    </div>
  
  )
}

export default MovieModal