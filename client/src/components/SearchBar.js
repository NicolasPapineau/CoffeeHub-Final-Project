import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement your search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <SearchIcon style={{ marginRight: '8px', color: 'white' }} />
      <InputBase
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        style={{ color: 'white', width: '100%', maxWidth: '200px' }} // Adjust the maxWidth as needed
      />
    </div>
  );
};

export default SearchBar;
