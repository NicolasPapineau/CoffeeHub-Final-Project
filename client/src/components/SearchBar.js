import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const SearchBarWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  color: white;

  &::placeholder {
    color: #ccc; /* Change this to the desired color */
  }
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  top: 10%;
  transform: translateX(-70%);
  color: white;
`;

const ResultsList = styled.ul`
  list-style: none;
  border-radius: 10px;
  padding: 0;
  position: absolute;
  top: 58%;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const ResultItem = styled.li`
  margin: 8px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ResultLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }
        const data = await response.json();
        setRecipes(data.data);
      } catch (error) {
        console.error('Error fetching recipes', error);
        setError('An error occurred while fetching recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredRecipes);
  }, [searchTerm, recipes]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = () => {
    // Clear search term and hide results when an item is clicked
    setSearchTerm('');
  };

  return (
    <SearchBarWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Input
        type="text"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setSearchTerm('')} // Clear input when clicked
      />
      <ResultsList show={searchTerm !== ''}>
        {searchResults.map((result) => (
          <ResultItem key={result._id}>
            <ResultLink to={`/recipe/${result._id}`} onClick={handleItemClick}>
              {result.title}
            </ResultLink>
          </ResultItem>
        ))}
      </ResultsList>
    </SearchBarWrapper>
  );
};

export default SearchBar;
