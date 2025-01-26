import React from 'react';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          padding: '10px',
          width: '300px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      />
    </div>
  );
}

export default SearchBar;
