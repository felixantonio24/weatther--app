import React, { useState } from 'react';

const Seeker = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
   
    onSearch(searchQuery);
  };

  return (
    <div className="seeker">
      <input className='input'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar una ciudad o pais"
      />
      <button onClick={handleSearch} className='search-botton'>Buscar</button>
    </div>
  );
};

export default Seeker;


