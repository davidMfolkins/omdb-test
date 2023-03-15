import { useState, useEffect } from 'react';
import axios from 'axios';

import './Search.css';

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    const URL = `https://omdbapi.com/?apikey=a086c7ae&s=${value}&type=movie`;
    axios.get(URL).then(response => {
      setResults([response.data.Search]);
    });
  }, [value]);

  const searchResult: any = results[0] && results[0].map((movie: any) => {
    if (movie.Title) {
      return (
        <div className="result">
          <img src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
          <div className="result-content">Title: {movie.Title}</div>
          <div className="result-content">Year Released: {movie.Year}</div>
        </div>
      );
    }
  });

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
