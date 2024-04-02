import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

const Pokedex = ({ apiUrl }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPokemonData();
  }, [currentPage, selectedLanguage]);

  const fetchPokemonData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setPokemonData(jsonData.data);
      setTotalPages(jsonData.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <div>
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {pokemonData.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemonId={pokemon.id} />
          ))}
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Back</button>
            {renderPaginationButtons()}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pokedex;
