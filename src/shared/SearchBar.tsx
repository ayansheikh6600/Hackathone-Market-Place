import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Call the onSearch prop with the query
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Search products..."
      className="py-2 px-4 border border-gray-300 rounded-lg"
    />
  );
};

export default SearchBar;
