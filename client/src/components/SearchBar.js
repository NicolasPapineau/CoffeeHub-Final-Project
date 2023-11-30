import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes when the component mounts
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (response.ok) {
          const result = await response.json();
          setSearchResults(result.data);
        } else {
          console.error('Failed to fetch recipes');
        }
      } catch (error) {
        console.error('Error during fetchRecipes:', error);
      }
    };

    fetchRecipes();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  const handleSearch = (selectedResult) => {
    // Redirect to the recipe details page
    navigate(`/recipe/${selectedResult._id}`);
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
    setShowDropdown(!!value);
  };

  useEffect(() => {
    // Reset search term and hide dropdown after navigation
    if (!showDropdown) {
      setSearchTerm('');
    }
  }, [showDropdown]);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <SearchIcon style={{ color: 'white' }} />
      <InputBase
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setShowDropdown(!!searchTerm)}
        onBlur={() => setShowDropdown(false)}
        style={{ color: 'white', width: '100%', maxWidth: '200px' }}
      />
      {showDropdown && (
        <DropdownContainer>
          {searchResults
            .filter((result) => result.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 10)
            .map((result) => (
              <MenuItem key={result._id} onClick={() => handleSearch(result)}>
                {result.title}
              </MenuItem>
            ))}
        </DropdownContainer>
      )}
    </div>
  );
};

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default SearchBar;
