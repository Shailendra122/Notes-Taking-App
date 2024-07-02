import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, toggleDarkMode } from '../redux/settingsSlice';
import { BiSearch, BiMoon, BiSun } from 'react-icons/bi';

const Header = () => {
  const [query, setQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.settings.darkMode);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(setSearchQuery(newQuery));
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
           <div className="absolute right-0 top-0 mt-[-4px] mr-8 flex flex-col max-w-[240px]">
            <label className="text-xs font-bold text-indigo-400 relative top-2 left-2.5  px-1 z-2">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search here..."
              value={query}
              onChange={handleSearch}
              className={`p-3 text-xs border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-indigo-200 bg-white'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
         </div>
         
          )}
        </div>
        <div className="relative">
          <span
            className={`cursor-pointer ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => dispatch(toggleDarkMode())}
          >
            {darkMode ? <BiSun className="h-6 w-6" /> : <BiMoon className="h-6 w-6" />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
