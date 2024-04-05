import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function Pokedex() {
  const [pokemons] = useState([]);
  const [language, setLanguage] = useState('english');
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    setLoading(true);
    const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${page}`);
    const data = await response.json();
    setPokemonList(data.data);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div>
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div className="pokedex"></div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Back
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-container">
          {pokemonList.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
          ))}
        </div>
      )}
      <div className="page-info">
        <p>Page {currentPage} of {totalPages}</p>
      </div>
    </div>
  );
}

export default Pokedex;
