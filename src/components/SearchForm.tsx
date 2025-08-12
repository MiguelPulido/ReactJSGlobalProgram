import { useState } from 'react';
import './SearchForm.css';


interface SearchFormProps {
  initialSearchText: string;
  onSearch: (query: string) => void;
}

const SearchForm = ({ initialSearchText, onSearch }: SearchFormProps) => {
    const [searchText, setSearchText] = useState<string>(initialSearchText);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onSearch(searchText);
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className='search-form'>
            <input
                className='search-input'
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="What do you want to watch?"
            />
            <button type="submit" className='search-button'>
                Search
            </button>
        </form>
        </div>
    );
};

export default SearchForm;
