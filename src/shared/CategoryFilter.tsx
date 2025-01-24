import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onCategoryChange }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  return (
    <select
      onChange={handleCategoryChange}
      className="h-fit  p-2 border border-gray-300 rounded-lg"
    >
      <option value="All">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
