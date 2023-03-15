import { useState, useEffect } from 'react';
import './Search.css';
import omdbApiSearch from './omdbApiSearch';

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any>([]);
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
        return (
          <div className="result">
            <img src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
            <div className="result-content">Title: {movie.Title}</div>
            <div className="result-content">Year Released: {movie.Year}</div>
            <div className="result-content">Type: {movie.Type}</div>
          </div>
        );
      }
  })
  };

  return (
    <div className="Search">
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
      );
    </div>
  );
}

export default Search;
