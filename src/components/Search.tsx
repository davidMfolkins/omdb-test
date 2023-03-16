import { useState, useEffect } from 'react';
import '../css/Search.css';
import { omdbApiSearch } from './omdbApiSearch';
import MovieModal from './MovieModal';

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [movie, setMovie] = useState();
  const [error, setError] = useState(false);
  let searchResult;

  useEffect(() => {
    //delay the results so it will only send the api call after the use is done searching
    const delayResults = setTimeout(() => {
      omdbApiSearch(value)
      .then(data => {
        // check if movie is not found, if not found show error
        if (data.Error === 'Movie not found!') {
          setError(true)
        } else {
        // otherwise don't show error and set results to the results from api
          setResults([data.Search])
          setError(false)
        }
      })
      .catch(err => console.log(err))
    }, 500)

    return () => clearTimeout(delayResults)
    

  }, [value]);

  if (results[0]) {
    searchResult = results[0].map((movie: any) => {

      if (movie.Title) {
        return (
          <div className="result" onClick={() => (setOpenModal(true), setMovie(movie.Title), window.scrollTo(0, 200))}>
            <img src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
            <p className="result-content">Title: {movie.Title}</p>
            <p className="result-content">Year Released: {movie.Year}</p>
            <p className="result-content">Type: {movie.Type}</p>
          </div>
        );
      }
    })
  };

  return (
    <div className="Search">
      {openModal ?
        <div className='modal-container'>
          <button className='modal-button' onClick={() => setOpenModal(false)}>X</button>
          <MovieModal movie={movie} />
        </div>
        : null}
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
          {searchResult ? searchResult : 
          <p className='result-message'>
            {value && error ? "No movie with that name, please refine your search" : null}
          </p>
          }
        </div>
      </div>
    </div>
  );
}

export default Search;
