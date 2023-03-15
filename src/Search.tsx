import { useState, useEffect } from 'react';
import './Search.css';
import {omdbApiSearch} from './omdbApiSearch';
import MovieModal from './MovieModal';

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [movie, setMovie] = useState();
  let searchResult;

  useEffect(() => {
    omdbApiSearch(value)
    .then(data => {
      setResults([data.Search])
  })
  .catch(err => console.log(err))

  }, [value]);

  if(results[0]) {
    searchResult = results[0].map((movie: any) => {

      if (movie.Title) {
        console.log(movie.Title)
        return (
          <div className="result" onClick={() => (setOpenModal(true), setMovie(movie.Title), window.scrollTo(0, 200))}>
            <img src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
            <div className="result-content">Title: {movie.Title}</div>
            <div className="result-content">Year Released: {movie.Year}</div>
            <div className="result-content">Type: {movie.Type}</div>
          </div>
        );
      }
  })
  };

  console.log(movie)
  return (
    <div className="Search">
                {openModal ? 
                
          <div className='modal-container'>
            <button className='modal-button' onClick={() => setOpenModal(false)}>X</button>
          <MovieModal movie={movie}/> 
          </div>
          : null }
      <div>
          <form className="search-container" onSubmit={event => event.preventDefault()}>
            <input className="search-bar"
              type="text"
              name="search"
              placeholder="Search for an movie..."
              spellCheck="false"
              autoComplete="off"
              value={value}
              onChange={event => setValue(event.target.value)}
            />
          </form>
          <div className="result-container">
            {searchResult}
          </div>

        </div>
    </div>
  );
}

export default Search;
