import React, { useEffect, useState } from 'react';
import { fetchCategories } from "../services/bookApi"; 

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch categories');
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <div>Laddar...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Bokkategorier</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.book_category}>
            <a href={`/category/${category.book_category}`}>
              {category.book_category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
