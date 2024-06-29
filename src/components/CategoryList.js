import React, { useState } from 'react';

const CategoryList = ({ categories, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Categories</h2>
      <div className="flex flex-wrap mb-2">
        {categories.map((category, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2">
            {category}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CategoryList;