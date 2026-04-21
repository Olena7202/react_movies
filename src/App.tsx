import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

function movieFilter(movies: Movie[], filterQuery: string) {
  const normalizeQuery = filterQuery.trim().toLowerCase();

  if (normalizeQuery) {
    return movies.filter(movie => {
      return (
        movie.title.toLowerCase().includes(normalizeQuery) ||
        movie.description.toLowerCase().includes(normalizeQuery)
      );
    });
  }

  return movies;
}

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [query, setQuery] = useState('');

  const onAdd = (movie: Movie) => {
    setMovies(prev => [...prev, movie]);
  };

  const visibleMovies = movieFilter(movies, query);

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                value={query}
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={event => setQuery(event.target.value)}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
