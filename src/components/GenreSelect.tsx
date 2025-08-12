import './GenreSelect.css';


interface GenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
}

const GenreSelect = ({ genres, selectedGenre, onSelect }: GenreSelectProps) => {
  const handleGenreClick = (genre: string): void => {
    onSelect(genre);
  };

  return (
    <div className="genre-select-container">
        {genres.map((genre) => (
            <button
                key={genre}
                onClick={() => handleGenreClick(genre)}
                className={selectedGenre === genre ? 'genre-button-selected' : 'genre-button'}
                type="button"
            >
                {genre}
            </button>
        ))}
    </div>
  );
};

export default GenreSelect;
