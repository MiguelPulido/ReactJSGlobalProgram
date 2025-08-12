import { useState } from 'react';
import SearchForm from './components/SearchForm';
import GenreSelect from './components/GenreSelect';
import Counter from './components/Counter';
import './App.css';

const MOVIE_GENRES = [
  'All',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
];

const DEFAULT_MOVIE_GENRE = MOVIE_GENRES[0];

function App() {
  const [lastSearchText, setLastSearchText] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>(DEFAULT_MOVIE_GENRE);

  const handleSearch = (searchText: string): void => {
    setLastSearchText(searchText);
    console.log('Search performed:', searchText);
  };

  const handleGenreSelect = (genre: string): void => {
    setSelectedGenre(genre);
    console.log('Genre selected:', genre);
  };

  return (
    <div className="app-container">
      <section>
        <Counter initialValue={3} />
      </section>
      <section>
        <SearchForm 
          initialSearchText="Test text"
          onSearch={handleSearch}
        />
        {!!lastSearchText && (
          <div>
            <strong>Last Search:</strong> "{lastSearchText}"
          </div>
        )}
      </section>
      <section>
        <GenreSelect 
          genres={MOVIE_GENRES}
          selectedGenre={selectedGenre}
          onSelect={handleGenreSelect}
        />
        {!!selectedGenre && (
          <div>
            <strong>Selected:</strong> "{selectedGenre}"
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
