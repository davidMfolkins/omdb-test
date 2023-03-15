import { useEffect, useState } from 'react';
import './MovieModal.css';
import { omdbMovieSearch } from './omdbApiSearch';


function MovieModal(name: any) {
const [movie, setMovie] = useState<any>()
  useEffect(() => {
    omdbMovieSearch(name)
    .then(data => {
      setMovie(data)
  })
  .catch(err => console.log(err))

  }, []);

  return (
    <div className='container'>
      {movie ?
      <div className='container-content'>
       <img src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
       <div className="movie-info">Title: {movie.Title}</div>
       <div className="movie-info">Year Released: {movie.Year}</div>
       <div className="movie-info">Plot: {movie.Plot}</div>
       </div>
       :
       null
      
      }
           
    </div>
  
  )
}

export default MovieModal