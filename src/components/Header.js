/*
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Header = ({ onSearch }) => {
  const [tagQuery, setTagQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleTagSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setTagQuery(query);
    onSearch(query); // Lift state up to App.js for filtering notes
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-4xl font-bold text-gray-800">Note Taking App</h1>
      <div className="relative">
        <span
          className="cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={toggleSearchVisibility}
        >
          <BiSearch className="h-6 w-6" />
        </span>
        {isSearchVisible && (
          <input
            type="text"
            placeholder="Search by tags..."
            value={tagQuery}
            onChange={handleTagSearch}
            className="absolute right-0 top-0 mt-[-5px] mr-7  p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
*/

import React, { useState } from 'react';
import { BiSearch, BiMoon, BiSun } from 'react-icons/bi';

const Header = ({ onSearch, onToggleDarkMode, darkMode }) => {
  const [query, setQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Note Taking App</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">

          <span
            className={`cursor-pointer ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={toggleSearchVisibility}
          >
            <BiSearch className="h-6 w-6" />
          </span>

          {isSearchVisible && (
            <div className="absolute right-0 top-0 mt-[-4px] mr-8 flex">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
                className={`p-2  border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'} rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          )}

        </div>

        <div className="relative">
          <span
            className={`cursor-pointer ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={onToggleDarkMode}
          >
            {darkMode ? <BiSun className="h-6 w-6" /> : <BiMoon className="h-6 w-6" />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;